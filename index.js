import { weeks } from './main.js';

function populateListHtml () {
    const linkListElement = document.getElementById("links");
    let listHtml = "";
    for (let i = 0; i < weeks.length; i++) {
        listHtml += `<li><ul>`;
        if (weeks[i].length) {
            for (const link of weeks[i]) {
                listHtml += `<li><a href='${link.path}'>${link.label}</a></li>`;
            }
        } else {
            listHtml += '<li></li>'
        }
        listHtml += "</ul></li>"
    }
    linkListElement.innerHTML = listHtml;
}

window.onload = populateListHtml;
