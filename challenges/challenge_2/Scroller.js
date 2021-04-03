import CircularArray from "./CircularArray.js";
// const options = {};
const ANALYSE_DELAY = 200;
const SCROLL_DELAY = 1000;
const SCROLL_SAMPLE_SETS = 6;
const TOP_THRESHOLD = window.innerHeight / 5;
const BOTTOM_THRESHOLD = TOP_THRESHOLD * 4;
const SCROLL_AMOUNT = window.innerHeight / 3;
const analyseArray = new CircularArray(SCROLL_SAMPLE_SETS);


export default class Scroller {
    constructor(contentElement) {
        window.saveDataAcrossSessions = true;
        this.contentElement = contentElement;
        this.enabled = false;
        this.yPredictions = [];
        this.lastAnaliysedTime = 0;
        this.lastScrollTime = 0;
        // GazeListener passed as anonymous function so that it will have the correct this.
        // eslint-disable-next-line no-undef
        webgazer.setGazeListener((data, elapsedTime) => {
            if(!data || isNaN(elapsedTime)){
                return;
            }
            this.yPredictions.push(data.y);
            if (elapsedTime - this.lastAnaliysedTime > ANALYSE_DELAY) {
                this.analyse(this.yPredictions, elapsedTime);
                this.yPredictions = [];
                this.lastAnaliysedTime = elapsedTime;
            }
        }).begin();
    }
    start() {
        this.enabled = true;
    }
    pause() {
        this.enabled = false;
    }
    stop() {
        this.pause();
        // eslint-disable-next-line no-undef
        webgazer.end();
    }
    reset() {
        // eslint-disable-next-line no-undef
        webgazer.clearData();
    }
    analyse(yPredictions, elapsedTime) {
        analyseArray.push(average(yPredictions));
        if (!this.enabled || elapsedTime - this.lastScrollTime < SCROLL_DELAY) {
            return;
        }
        let analyzeY = average(analyseArray.getArray());
        if (analyzeY < TOP_THRESHOLD) {
            // scroll up
            window.scrollBy(0, -SCROLL_AMOUNT);
            this.lastScrollTime = elapsedTime;
        } else if (analyzeY > BOTTOM_THRESHOLD) {
            //scroll down
            window.scrollBy(0, SCROLL_AMOUNT);
            this.lastScrollTime = elapsedTime;
        }
    }
}

function average(array) {
    return array.reduce((total, val) => total + val) / array.length;
}