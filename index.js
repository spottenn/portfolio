import { weeks } from './main.js';

function populateListHtml () {
    const linkListElement = document.getElementById("links");
    let listHtml = "";
    for (const week of weeks) {
        listHtml += "<li><ul>"
        if (week.length) {
            for (const link of week) {
                listHtml += `<li><a href='${link.path}'>${link.label}</a></li>`;
            }
        } else {
            listHtml += '<pre> </pre>'
        }
        listHtml += "</ul></li>"
    }
    linkListElement.innerHTML = listHtml;
}

window.onload = populateListHtml;
