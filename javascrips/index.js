let apikey = '4104745c63fccce3833cd4a988cafe94';
let currentCategory = "tecnologia"
let secondApiKey  = "21210b980039bdfb1ffe3f0f4f099e38"
let thirdApiKey = "d925d0943f82037efb01e3802f816617"

document.onload = getNews("tecnologia", 6, addNewsItem)
document.onload = getNews("games", 3, addNewsGameItem)

async function getNews(about = "tecnologia", amountNews = 10, callback) {
    url = `https://gnews.io/api/v4/search?q=${about}&lang=pt&country=br&max=${amountNews}&apikey=${apikey} `;

    fetch(url)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        articles = data.articles;

        for (i = 0; i < articles.length; i++) {
          callback(articles[i])
        }

      });
    
}

function changeCategory(category) {
    if (currentCategory == category) return
    let element = document.getElementById("newsList")
    element.innerHTML = "";
    getNews(category, 6, addNewsItem)
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

function addNewsGameItem(data = { title : "", description: "", image: "", publishedAt: "", url: "", source: { name: "", url: "" } }){
  let newsListElement = document.getElementById("newsGame")
    let html = ""
    html += `<div class="news-game-item">`
    html += `<span class="news-game-text"><a href="${data.url}">${data.description}</a></span>`
    html += `<img src="${data.image}" alt="" class="news-game-img" onerror="this.src='./assets/GTA6.jpg'" >`
    html += `</div>`
    html += `<div style="height: 1px; background-color: rgba(255, 255, 255, 0.459); width: 90%;"></div>`
                    
    newsListElement.innerHTML += html
}

function formatDate(dataString) {
    const date = new Date(dataString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}

function changeApiKey() {
  let value = prompt("API KEY") 
  apikey =  value ? value : '4104745c63fccce3833cd4a988cafe94';
  getNews("tecnologia", 6, addNewsItem)
  getNews("games", 3, addNewsGameItem)
}