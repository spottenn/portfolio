const options = {};
const ANALYSE_DELAY = 250;

let xPredictions = [];
let lastAnaliysedTime = 0;
export default class Scroller {
    constructor(contentElement, uiHintTop, uiHintBottom) {
        this.contentElement = contentElement;
        this.uiHintTop = uiHintTop;
        this.uiHintBottom = uiHintBottom;
    }
    start() {

    }
    stop() {

    }
    scroll(y) {

    }
    gazeListener(data, elapsedTime) {
        if(!data || isNaN(elapsedTime)){
            return;
        }
        xPredictions.push(data.x);
        lastAnaliysedTime += elapsedTime;
        if (lastAnaliysedTime > ANALYSE_DELAY) {
            this.analyse(xPredictions); // need to bind the correct this.
            console.log(data.x);
            xPredictions = [];
        }
        // predictions.y.push(data.y);

    }
    analyse(xPredictions) {

    }
}

webgazer.setGazeListener(gazeListener).begin();