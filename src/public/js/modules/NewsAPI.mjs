import * as utils from './utils.mjs';

export default class News { 
    constructor() {
        this.newsContainer = utils.qs('#news-container');
        if (!this.newsContainer) {
            console.error('News container not found in the DOM.');
            return;
        }
        this.init();
    }
    init() {
        this.getHealthNews()
            .then(newsData => this.renderNews(newsData))
            .catch(error => console.error('Error initializing news:', error));
    }

    
    newsTemplate(article) {
        return `
            <div class="news-item">
                <img src="${article.urlToImage || 'https://placehold.co/150x150/webp?text=HTPro'}" alt="${article.title}" class="news-img">
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                    <figcaption>${article.author || ''} - ${article.source.name}</figcaption>
                </div>
            </div>
        `;
    }

    async getHealthNews() {
        try {
            const apiKey = '341580d6c198432baa865b672c07b393';
            const keywords = 'health mental health wellness fitness nutrition exercise diet';
            const language = 'en';
            const searchIn = 'title,description'; // or 'content'
            const sortBy = 'relevancy'; // or 'relevancy', 'popularity', 'publishedAt'
            const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            
            //limit the number of articles to 5
            if (data.articles && data.articles.length > 5) {
                data.articles = data.articles.slice(0, 5);
            }
            return data.articles || [];
        } catch (error) {
            console.error('Error fetching health news:', error);
            return [];
        }

    }

    
    renderNews(articles) {
        if (!Array.isArray(articles) || articles.length === 0) {
            this.newsContainer.innerHTML = '<p>No news articles available.</p>';
            return;
        }
        const newsHtml = articles.map(article => this.newsTemplate(article)).join('');
        this.newsContainer.innerHTML = newsHtml;
    }
    
   

}
