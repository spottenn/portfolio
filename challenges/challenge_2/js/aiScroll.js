import UiSteps from "./UiSteps.js";
import {applyStyleClassToAll} from "./Utils.js";

window.addEventListener("load", () => {


    const contentDiv = document.getElementById('ui_steps_content');
    const uiSteps = new UiSteps(contentDiv);

    async function startOrRestart() {
        if (history.state) {
            uiSteps.handlePopState({state: history.state});
        } else {
            uiSteps.startStep(0);
        }
    }
    applyStyleClassToAll('ai_scroll')
    startOrRestart();
})
