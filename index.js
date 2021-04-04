import {weeks} from './main.js';

function populateListHtml() {
    const linkListElement = document.getElementById("links");
    let listHtml = "";
    for (let i = 0; i < weeks.length; i++) {
        listHtml += `<li><ul>`;
        if (weeks[i].length) {
            for (let j = 0; j < weeks[i].length; j++) {
                listHtml +=
                    `<li><a href='${weeks[i][j].path}'>${weeks[i][j].label}${j + 1 < weeks[i].length ? ',' : '' }</a></li>`;
            }
        } else {
            listHtml += '<li></li>'
        }
        listHtml += "</ul></li>"
    }
    linkListElement.innerHTML = listHtml;
}

window.onload = populateListHtml;
