import WikipediaHelper from "./WikipediaHelper.js";
import Scroller from "./Scroller.js";
import { fetchResults, applyStyleRecursive } from "./Utils.js";

const stepNamesInOrder = ['start', 'calibrate', 'search', 'results', 'article'];
const scroller = new Scroller();
const wikipediaHelper = new WikipediaHelper();
const startingState = {
    currentStep: 0,
    query: '',
    articleTitle: '',
    interval: 0
};


export default class UiSteps {
    constructor(contentDiv) {
        this.contentDiv = contentDiv;
        this.state = Object.assign({}, startingState);
        //defined as an anonymous functions to have the correct this reference
        this.nextStep = () => {
            if (this.state.currentStep + 1 >= stepNamesInOrder.length) {
                return;
            }
            this.startStep(this.state.currentStep + 1);
        }
        this.handlePopState = (event) => {
            clearInterval(this.state.interval);
            scroller.pause();
            if (event.state) {
                this.state = event.state;
            } else {
                this.state = Object.assign({}, startingState);
            }
            this.restoreStep(stepNamesInOrder[this.state.currentStep]);
        }
        window.addEventListener('popstate', this.handlePopState);
    }
    start() {
        document.getElementById('start_continue').addEventListener('click', this.nextStep);
    }
    calibrate() {
        scroller.reset();
        let secondsSpan = document.getElementById('seconds');
        let secondsRemaining = 30;
        let that = this;
        this.state.interval = setInterval(() => {
            if (secondsRemaining) {
                secondsRemaining--;
                secondsSpan.innerText = secondsRemaining.toString();
            } else {
                clearInterval(this.state.interval);
                that.nextStep();
            }
        }, 1000);
    }
    search() {
        document.getElementById('search_button').addEventListener('click', (e) => {
            e.preventDefault();
            this.state.query = document.getElementById('query').value;
            if (this.state.query !== '') {
                this.nextStep();
            }
        });
    }
    async results() {
        let resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = await wikipediaHelper.getSearchResultsHtmlList(this.state.query);
        applyStyleRecursive(this.contentDiv, 'ai_scroll');
        resultsDiv.addEventListener("click", (e) => {
            if (!e.target.dataset.title) {
                return;
            }
            e.preventDefault();
            this.state.articleTitle = e.target.dataset.title;
            this.nextStep();
        });
    }
    async article() {
        scroller.start();
        let articleDiv = document.getElementById('article_div');
        articleDiv.innerHTML = await wikipediaHelper.getArticle(this.state.articleTitle);
        articleDiv.addEventListener('click',async (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                if (e.target.getAttribute('href').match(/^\//)) {
                    articleDiv.innerHTML = await wikipediaHelper.getArticle(e.target.title);
                    this.state.articleTitle = e.target.title;
                    window.scrollTo(0, 0);
                    history.pushState(this.state, 'article');
                }
            }
        });
    }
    async restoreStep(stepName) {
        this.contentDiv.innerHTML = await fetchResults(`./partials/${stepName}.html`);
        applyStyleRecursive(this.contentDiv, 'ai_scroll');
        await this[stepName]();
    }
    async startStep(newStepInt) {
        let stepName = stepNamesInOrder[newStepInt];
        await this.restoreStep(stepName);
        this.state.currentStep = newStepInt;
        if (newStepInt) {
            history.pushState(this.state, stepName);
        }
    }

    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }

}
