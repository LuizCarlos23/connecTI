document.onload = getNews("tecnologia", 6)


async function getNews(about = "tecnologia", amountNews = 10) {
    apikey = '4104745c63fccce3833cd4a988cafe94';
    url = `https://gnews.io/api/v4/search?q=${about}&lang=pt&country=br&max=${amountNews}&apikey=${apikey} `;

    fetch(url)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        articles = data.articles;

        for (i = 0; i < articles.length; i++) {
            addNewsItem(articles[i])
        }

      });
    
}

function addNewsItem(data = { title : "", description: "", image: "", publishedAt: "", url: "", source: { name: "", url: "" } }) {
    let newsListElement = document.getElementById("newsList")
    let html = ""
    html += `<div class="news-iten">`
    html += `<img src="${data.image}" alt="" onerror="this.src='./assets/GTA6.jpg'">`
    html += `<div class="news-text">`
    html += `<a href="${data.url}" target="_blank"><span class="news-title">${data.title}:</span></a>`
    html += `<span class="news-subtitle">${data.description}</span>`
    html += `<span class="news-info">${formatDate(data.publishedAt)} - <a href='${data.source.url}' target="_blank">${data.source.name}</a></span>`
    html += `</div></div>`

    newsListElement.innerHTML += html
}

function formatDate(dataString) {
    const date = new Date(dataString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}
