const API_KEY = '0c1ed2cc3ca44531803324616d89f68f';
const choicesElem = document.querySelector('.js-choice');
const newsList = document.querySelector('.news-list');

const choices = new Choices(choicesElem, {
    searchEnabled: false,
    itemSelectText: '',
});

const getData = async (url) => {
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY,
        }
    });

    const data = await response.json();

    return data;
};

const renderCard = (data) => {
    console.log(data);
    newsList.textContent = '';
    data.forEach(news => {
        const card = document.createElement('li');
        card.className = 'news-item';

        card.innerHTML = `
            <img class="news-image" src="${news.urlToImage}" alt="${news.title}" width="270px" height="200px">
            <h3 class="news-title">
                <a class="news-link" href="${news.url}" target="_blank">
                    ${news.title}
                </a>
            </h3>
            <p class="news-description">
                ${news.description ? news.description : ''}
            </p>
            <div class="news-footer">
                <time class="news-datetime" datetime="${news.publishedAt}">
                    <span class="news-date">${news.publishedAt}</span> 11:06
                </time>
                <div class="news-author">
                    ${news.author}
                </div>
            </div>
        `;

        newsList.append(card);
    });
};

const loadNews = async () => {
    const data = await getData('https://newsapi.org/v2/top-headlines?country=ru');
    renderCard(data.articles);
};

loadNews();