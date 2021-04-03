import { getJSON } from "./Utils.js";

export default class WikipediaHelper {
    constructor() {
        this.storedQuery = '';
        this.storedarticleTitle = '';
    }
    async getSearchResultsHtmlList (query = this.storedQuery) {
        if (!query || query === '') {
            return 'no query entered';
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
        return html;
    }
    async getArticle(articleTitle = this.storedarticleTitle) {
        if (!articleTitle || articleTitle === '') {
            return '<p>There was an error. You can hitting the browser back button</p>';
        }
        let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${articleTitle}&redirects=1&prop=text&formatversion=2&origin=*`
        let result = await getJSON(url);
        if(result && result.parse && result.parse.title && result.parse.text) {
            return `<h2>${result.parse.title}</h2><div id="article_div">${result.parse.text}</div>`;
        }
        return '<p>There was an error. You can hitting the browser back button</p>'
    }
}