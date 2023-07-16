const menuToggle = document.querySelector(".toggle");
const nav = document.querySelector("header ul");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("slide");
});

["rum", "ms", "msh", "cs"].forEach((website) => {
  fetch(`https://artikel-islam.netlify.app/.netlify/functions/api/${website}`)
    .then(response => response.json())
    .then(json => {
      json.data.data.forEach(e => {
        if (e.thumbnail) {
          const category = document.querySelector(`.${website}`);

          const article = document.createElement("div");
          article.classList = "scroll-card";
          category.appendChild(article);

          const articleLink = document.createElement("a");
          articleLink.href = e.url
          articleLink.classList = "article-link";
          articleLink.target = "iframe";
          articleLink.onclick = () => {
            const main = document.querySelector("#main");
            const removeFrame = document.querySelector("iframe");
            if (removeFrame) {
              removeFrame.remove();
            }
            const createIframe = document.createElement("iframe");
            createIframe.name = "iframe";
            main.appendChild(createIframe);
            alert("Baca Artikel di Bagian Bawah Halaman");
          };
          article.appendChild(articleLink);

          const thumbnail = document.createElement("img");
          thumbnail.src = e.thumbnail;
          articleLink.appendChild(thumbnail);

          const titleLink = document.createElement("h1");
          titleLink.innerText = e.title;
          articleLink.appendChild(titleLink);
        }
      });
    })
})