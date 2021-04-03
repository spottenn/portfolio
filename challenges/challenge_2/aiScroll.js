import WikipediaHelper from "./WikipediaHelper.js";
import Scroller from "./Scroller.js";

window.addEventListener("load", () => {

    const wikipediaHelper = new WikipediaHelper();
    const scroller = new Scroller();
    const contentDiv = document.getElementById('ui_steps_content');
    //const elements
    const startingState = {
        currentStep: 0,
        query: '',
        articleTitle: '',
        interval: 0
    }

    let state = Object.assign({}, startingState);
    const uiSteps = {
        stepNamesInOrder: ['start', 'calibrate', 'search', 'results', 'article'],
        start: () => {
            document.getElementById('start_continue').addEventListener('click', uiSteps.nextStep);
        },
        calibrate: () => {
            scroller.reset();
            let secondsSpan = document.getElementById('seconds');
            let secondsRemaining = 3; // debug
            // let secondsRemaining = 30;
            let that = this;
            state.interval = setInterval(() => {
                if (secondsRemaining) {
                    secondsRemaining--;
                    secondsSpan.innerText = secondsRemaining.toString();
                } else {
                    clearInterval(state.interval);
                    that.nextStep();
                }
            }, 1000);
        },
        search: () => {
            document.getElementById('search_button').addEventListener('click', (e) => {
                e.preventDefault();
                state.query = document.getElementById('query').value;
                if (state.query !== '') {
                    uiSteps.nextStep();
                }
            });

        },
        results: async () => {
            let resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = await wikipediaHelper.getSearchResultsHtmlList(state.query);
            resultsDiv.addEventListener("click", (e) => {
                if (!e.target.dataset.title) {
                    return;
                }
                e.preventDefault();
                state.articleTitle = e.target.dataset.title;
                uiSteps.nextStep();
            })

        },
        article: async () => {
            scroller.start();
            let articleDiv = document.getElementById('article_div');
            articleDiv.innerHTML = await wikipediaHelper.getArticle(state.articleTitle);
            articleDiv.addEventListener('click',async (e) => {
                e.preventDefault();
                if (e.target.tagName === 'A') {
                    if (e.target.getAttribute('href').match(/^\//)) {
                        articleDiv.innerHTML = await wikipediaHelper.getArticle(e.target.title);
                        state.articleTitle = e.target.title;
                        window.scrollTo(0, 0)
                        history.pushState(state, 'article');
                    }
                }
            })
        },
        restoreStep: async (stepName) => {
            let html = await fetchResults(`./partials/${stepName}.html`)
            contentDiv.innerHTML = html;
            await uiSteps[stepName]();
        },
        startStep: async (newStepInt) => {
            let stepName = uiSteps.stepNamesInOrder[newStepInt];
            await uiSteps.restoreStep(stepName);
            state.currentStep = newStepInt;
            if (newStepInt) {
                history.pushState(state, stepName);
            }
        },
        nextStep: () => {
            if (state.currentStep + 1 >= uiSteps.stepNamesInOrder.length) {
                return;
            }
            uiSteps.startStep(state.currentStep + 1);
        }
    }


    function handlePopState(event) {
        clearInterval(state.interval);
        scroller.pause();
        if (event.state) {
            state = event.state;
        } else {
            state = Object.assign({}, startingState);
        }
        uiSteps.restoreStep(uiSteps.stepNamesInOrder[state.currentStep]);
    }

    async function fetchResults(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return await response.text();
        } catch (error) {
            console.log('There was an error: ', error)
        }
    }

    async function startOrRestart() {
        if (history.state) {
            handlePopState({state: history.state});
        } else {
            uiSteps.startStep(state.currentStep);
        }
    }

    window.onbeforeunload = function () {
        scroller.stop();
    }
    window.onpopstate = handlePopState;
    startOrRestart();
})
