const container = document.getElementById("container");

fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json")
    .then(response => response.json())
    .then(response => {
        console.log(response);

        const select = document.getElementById("quran");

        for (let i = 0; i < response.length; i++) {
            const option = document.createElement("option");
            option.value = response[i].number_of_surah;
            option.textContent = response[i].number_of_surah + ". " + response[i].name;
            select.appendChild(option);
        }

        fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/1.json")
            .then(response2 => response2.json())
            .then(response2 => {
                console.log(response2);

                container.innerHTML = "";

                const nameSurah = document.createElement("h1");
                nameSurah.classList = "surah"
                nameSurah.textContent = response2.name;
                container.appendChild(nameSurah);

                const translateName = document.createElement("h3");
                translateName.classList = "translate"
                translateName.textContent = response2.name_translations.id;
                container.appendChild(translateName);

                const type = document.createElement("p");
                type.classList = "place"
                type.textContent = response2.type;
                container.appendChild(type);

                const ayat = document.createElement("p");
                ayat.classList = "noayat"
                ayat.textContent = response2.number_of_ayah + " Ayat";
                container.appendChild(ayat);

                const numberSurah = document.createElement("p");
                numberSurah.classList = "nosurah"
                numberSurah.textContent = "Nomor Surah: " + response2.number_of_surah;
                container.appendChild(numberSurah);

                for (let i = 0; i < response2.verses.length; i++) {
                    const text = document.createElement("p");
                    text.classList = "ayat"
                    text.textContent = response2.verses[i].text;
                    container.appendChild(text);

                    const number = document.createElement("p");
                    number.textContent = response2.verses[i].number;
                    number.classList = "number";
                    container.appendChild(number);

                    const translateSurah = document.createElement("p");
                    translateSurah.classList = "t-ayat"
                    translateSurah.textContent = response2.verses[i].translation_id;
                    container.appendChild(translateSurah);
                }
            })
            .catch(err => console.log(err));

        select.addEventListener("change", (show) => {
            fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/" + show.target.value + ".json")
                .then(response2 => response2.json())
                .then(response2 => {
                    console.log(response2);

                    container.innerHTML = "";

                    const nameSurah = document.createElement("h1");
                    nameSurah.classList = "surah"
                    nameSurah.textContent = response2.name;
                    container.appendChild(nameSurah);

                    const translateName = document.createElement("h3");
                    translateName.classList = "translate"
                    translateName.textContent = response2.name_translations.id;
                    container.appendChild(translateName);

                    const type = document.createElement("p");
                    type.classList = "place"
                    type.textContent = response2.type;
                    container.appendChild(type);

                    const ayat = document.createElement("p");
                    ayat.classList = "noayat"
                    ayat.textContent = response2.number_of_ayah + " Ayat";
                    container.appendChild(ayat);

                    const numberSurah = document.createElement("p");
                    numberSurah.classList = "nosurah"
                    numberSurah.textContent = "Nomor Surah: " + response2.number_of_surah;
                    container.appendChild(numberSurah);

                    for (let i = 0; i < response2.verses.length; i++) {
                        const text = document.createElement("p");
                        text.classList = "ayat"
                        text.textContent = response2.verses[i].text;
                        container.appendChild(text);

                        const number = document.createElement("p");
                        number.textContent = response2.verses[i].number;
                        number.classList = "number";
                        container.appendChild(number);

                        const translateSurah = document.createElement("p");
                        translateSurah.classList = "t-ayat"
                        translateSurah.textContent = response2.verses[i].translation_id;
                        container.appendChild(translateSurah);
                    }
                })
                .catch(err => console.log(err));
        });
    })
    .catch(err => console.log(err));