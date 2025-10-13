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
                <img src="${article.image_url || 'https://placehold.co/150x150/webp?text=HTPro'}" alt="${article.title}" class="news-img">
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                    <figcaption>${article.source}</figcaption>
                </div>
            </div>
        `;
    }

    async getHealthNews() {
        try {
            const apiKey = 'jsscjgv1d6lPoi8N9ENfJPKiCgMN1cgsuaA7vZW0';
            const categories = 'health,food';
            const lang = 'en';
            const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&language=${lang}&categories=${categories}&limit=3`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const news = await response.json();
            console.log('Fetched News Data:', news);
            //limit the number of articles to 5
            if (news.data && news.data.length > 5) {
                news.data = news.data.slice(0, 5);
            }
            return news.data || [];
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
