const elemenJadwalSholat = document.querySelector('#waktu-sholat2');
const elemenDaerahKota = document.querySelector('#daerah-kota');
const elemenBulanTahun = document.querySelector('#bulan-tahun');
const ambilSelectIdKota = document.querySelector('#id-kota');
const prevBulan = document.querySelector('#sebelumnya');
const nextBulan = document.querySelector('#selanjutnya');
const waktuSekarang = new Date();

let array = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

if (ambilSelectIdKota) {
    function compare(a, b) {
        if (a.textContent < b.textContent) {
            return -1;
        }
        if (a.textContent > b.textContent) {
            return 1;
        }
        return 0;
    }

    let array2 = [];
    for (let kota of ambilSelectIdKota.children) {
        array2.push(kota);
    }
    array2.sort(compare);
    ambilSelectIdKota.innerHTML = '';
    for (let kota of array2) {
        ambilSelectIdKota.appendChild(kota);
    }
}

let idKota = localStorage.getItem('idKota');

if (idKota) {
    ambilSelectIdKota.value = idKota;
    ambilSelectIdKota.onchange = () => {
        localStorage.setItem('idKota', ambilSelectIdKota.value);
        idKota = localStorage.getItem('idKota');
        elemenJadwalSholat.innerHTML = '';
        ambilValueOptionIdKota();
    }
} else {
    idKota = localStorage.setItem('idKota', 1301);
}

let bulan = waktuSekarang.getMonth() + 1;

nextBulan.onclick = function () {
    bulan++;
    ambilValueOptionIdKota();
};

prevBulan.onclick = function () {
    bulan--;
    ambilValueOptionIdKota();
};

ambilValueOptionIdKota();


function ambilValueOptionIdKota() {
    elemenJadwalSholat.innerHTML = '';
    elemenBulanTahun.textContent = array[bulan - 1] + ' ' + waktuSekarang.getFullYear();
    fetch('https://api.myquran.com/v1/sholat/jadwal/' + idKota + '/' + waktuSekarang.getFullYear() + '/' + bulan + '/')
        .then(function (response) {
            return response.json();
        }).then(function (json) {

            elemenDaerahKota.textContent = 'JADWAL ADZAN DAERAH ' + json.data.lokasi;

            for (let i = 0; json.data.jadwal[i]; i++) {
                const elemenDataSholat = document.createElement('tr');

                const elemenTanggal = document.createElement('td');
                elemenTanggal.textContent = json.data.jadwal[i].tanggal;
                elemenTanggal.className = 'tanggal'
                elemenDataSholat.appendChild(elemenTanggal);

                function WaktuShalat(waktu) {
                    const elemenTd = document.createElement('td');
                    elemenTd.textContent = json.data.jadwal[i][waktu] + ' WIB';
                    elemenDataSholat.appendChild(elemenTd);
                }

                WaktuShalat('imsak');
                WaktuShalat('subuh');
                WaktuShalat('dhuha');
                WaktuShalat('dzuhur');
                WaktuShalat('ashar');
                WaktuShalat('maghrib');
                WaktuShalat('isya');

                elemenJadwalSholat.appendChild(elemenDataSholat);

            }

        });
}

const pilihKota = document.querySelector("#id-kota");

fetch("https://api.myquran.com/v1/sholat/kota/semua")
    .then(response => response.json())
    .then(json => {
        json.forEach((kota) => {
            const option = document.createElement("option");
            option.value = kota.id;
            option.textContent = kota.lokasi;
            if (kota.id == 1301) {
                option.selected = true;
            }
            pilihKota.appendChild(option);
        })
    });