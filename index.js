function populateListHtml () {
    const linkListElement = document.getElementById("links");
    let listHtml = "";
    for (const link of links) {
        listHtml += "<li><a href='" + link.path + "'>" + link.label + "</a></li>";
    }
    linkListElement.innerHTML = listHtml;
}

window.onload = populateListHtml;