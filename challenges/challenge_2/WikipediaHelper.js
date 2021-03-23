export default class WikipediaHelper {
    constructor() {
        this.lastQuery = '';
    }
    getSearchResults (query = '') {
        if (!query || query === '') {
            query = this.lastQuery;
            if (query === ''){
                return '';
            }
        }
        //todo: finish
        this.lastQuery = query;
    }
    getArticle(articleId) {

    }
}