export default class WikipediaHelper {
    constructor() {
        this.storedQuery = '';
        this.storedArticleId = '';
        // this.lastSearchResults = {};
    }
    async getSearchResultsHtmlList (query = this.storedQuery) {
        if (!query || query === '') {
            return ''; //todo handle error
        }
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&formatversion=2&origin=*`
        let results = await getJSON(url);
        let html = '<ul>';
        results.query.search.forEach(item => {
            html += `<li data-id="${item.pageid}"><strong data-id="${item.pageid}">${item.title}</strong>...${item.snippet}...</li>`
        })
        html += '</ul>';
        //todo: add no results case
        //todo: handle style element
        //todo: finish
        //needs to return prebuilt html with dataset article id attributes
        this.storedQuery = query;
        return html;
    }
    async getArticle(articleId = this.storedArticleId) {
        if (!articleId || articleId === '') {
            return ''; //todo handle error
        }
        //todo: remove links?
        // let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&pageid=24768&prop=text&formatversion=2&origin=*`
        let url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&pageid=${articleId}&prop=text&formatversion=2&origin=*`
        let result = await getJSON(url);
        return result.parse.text;
    }
}
function getJSON(url){
    return fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw Error(response.statusText);
            }
        })
        .catch(error => console.log(`error: ${error}`));
}