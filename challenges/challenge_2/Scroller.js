import CircularArray from "./CircularArray.js";
// const options = {};
const ANALYSE_DELAY = 200;
const SCROLL_DELAY = 1000;
const HINT_SAMPLE_SETS = 3;
const SCROLL_SAMPLE_SETS = 5;
const TOP_THRESHOLD = window.innerHeight / 5;
const BOTTOM_THRESHOLD = TOP_THRESHOLD * 4;
const SCROLL_AMOUNT = window.innerHeight / 3;
const analyseArray = new CircularArray(SCROLL_SAMPLE_SETS);
// const hintArray = new CircularArray(HINT_SAMPLE_SETS);


export default class Scroller {
    constructor(contentElement, uiHintTop, uiHintBottom) {
        this.contentElement = contentElement;
        this.uiHintTop = uiHintTop;
        this.uiHintBottom = uiHintBottom;
        this.enabled = false; //todo:see if needed
        this.yPredictions = [];
        this.lastAnaliysedTime = 0;
        this.lastScrollTime = 0;
        // webgazer.showVideoPreview(false); //todo: show video after fixing style
        webgazer.setGazeListener((data, elapsedTime) => {
            // console.log('got here');
            if(!data || isNaN(elapsedTime)){
                return;
            }
            this.yPredictions.push(data.y);
            if (elapsedTime - this.lastAnaliysedTime > ANALYSE_DELAY) {
                this.analyse(this.yPredictions, elapsedTime); // need to bind the correct this.

                // console.log(data.y);
                this.yPredictions = [];
                this.lastAnaliysedTime = elapsedTime;
            }
            // predictions.y.push(data.y);

        }).begin();
    }
    start() {
        // this.uiHintBottom style visible
        // this.uiHintTop style visible
        this.enabled = true;
    }
    stop() {
        // this.uiHintBottom style visible
        // this.uiHintTop style visible
        this.enabled = false;
    }
    analyse(yPredictions, elapsedTime) {
        analyseArray.push(average(yPredictions));
        // hintArray.push(analyseArray.getLastItem())
        // let hintY = average(hintArray.getArray());
        // if (hintY < TOP_THRESHOLD) {
        //     //highlight top hint
        // } else if (hintY > BOTTOM_THRESHOLD) {
        //     //highlight bottom hint
        // }
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
    // prepareArray(source, )
}

function average(array) {
    return array.reduce((total, val) => total + val) / array.length;
}