import WikipediaHelper from "./WikipediaHelper";

const wikipediaHelper = new wikipediaHelper();

const steps = ['step 1']; // todo: fill in names
//const elements
function startStep () {}
function nextStep () {}
function handlePopState () {}

document.addEventListener('load', () => {
    startStep(1);
    document.addEventListener('popState', handlePopState)
})
