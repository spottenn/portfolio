import WikipediaHelper from "./WikipediaHelper.js";
import Scroller from "./Scroller.js";

const wikipediaHelper = new WikipediaHelper();
const scroller = new Scroller();
const contentDiv = document.getElementById('content');
//const elements
const startingState = {
    currentStep: 0,
    query: '',
    articleId: '',
    interval: 0
    //, scrollEnabled: true //todo: only if it can't be enabled from the beginning
}

let state = Object.assign({}, startingState);
const uiSteps = {
    stepNamesInOrder: ['start', 'calibrate', 'search', 'results', 'article'],
    'start': () => {
        document.getElementById('start_continue').addEventListener('click', uiSteps.nextStep);
        //todo: wait time for loading then enable button
    },
    'calibrate': () => {
        let secondsSpan = document.getElementById('seconds');
        let secondsRemaining = 30;

        state.interval =  setInterval(() => {
            if (secondsRemaining) {
                secondsRemaining--;
                secondsSpan.innerText = secondsRemaining.toString();
            } else {
                clearInterval(state.interval);
                uiSteps.nextStep();
            }
        }, 1000);
    },
    'search': () => {
        document.getElementById('search_button').addEventListener('click', (e) => {
            e.preventDefault();
            state.query = document.getElementById('query').value;
            uiSteps.nextStep();
        });

    },
    'results': async () => {
        let resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = await wikipediaHelper.getSearchResultsHtmlList(state.query);
        resultsDiv.addEventListener("click", (e) => {
            state.articleId = e.target.dataset.id;
            uiSteps.nextStep();
        })

    },
    'article': async () => {
        scroller.start();
        let articleDiv = document.getElementById('article_div');
        articleDiv.innerHTML = await wikipediaHelper.getArticle(state.articleId);
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
        //todo: pushState to browser
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

// document.addEventListener('load', () => {
// todo: handle browser refresh
uiSteps.startStep(state.currentStep);

window.onpopstate = handlePopState;
