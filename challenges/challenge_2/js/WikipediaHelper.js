import { getJSON } from "./Utils.js";

export default class WikipediaHelper {
    constructor() {
        this.storedQuery = '';
        this.storedResults = '';
        this.storedarticleTitle = '';
        this.storedAticle = '';
    }
    async getSearchResultsHtmlList (query) {
        if (!query) {
            return 'no query entered';
        } else if (query === '' || query === this.storedQuery && this.storedResults) {
            return this.storedResults;
        }
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&formatversion=2&origin=*`
        let results = await getJSON(url);
        let html = '';
        if (results && results.query && results.query.search && results.query.search.length) {
            results.query.search.forEach(item => {
                html += `<p><a class="result_title" data-title="${item.title}" href="./ai_scroll.html">${item.title}</a>: ${item.snippet}...</p>`
            })
        } else {
            html += '<p>no results found</p>'
        }
        this.storedQuery = query;
        this.storedResults = html;
        return html;
    }
    async getArticle(articleTitle) {
        if (!articleTitle) {
            return 'There was an error. Try hitting the browser back button.';
        } else if (articleTitle === '' || articleTitle === this.storedarticleTitle && this.storedAticle) {
            return this.storedAticle;
        }
        let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${articleTitle}&redirects=1&prop=text&formatversion=2&origin=*`
        let result = await getJSON(url);
        if(result && result.parse && result.parse.title && result.parse.text) {
            return `<h2>${result.parse.title}</h2><div id="article_div">${result.parse.text}</div>`;
        }
        return '<p>There was an error. You can hitting the browser back button</p>'
    }
}