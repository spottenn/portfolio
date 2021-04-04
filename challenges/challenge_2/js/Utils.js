async function fetchResponse(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
function applyStyleRecursiveSiblings(node, className) {
    while(node){
        if(node.nodeType === Node.ELEMENT_NODE) {
            node.className = `${className} ${node.className}`;
        }
        applyStyleRecursiveSiblings(node.firstChild, className);
        node = node.nextSibling;
    }
}
export function applyStyleRecursive(node, className) {
    if(!node || node.nodeType === Node.TEXT_NODE) {
        return;
    }
    node.classList.add(className)
    applyStyleRecursiveSiblings(node.firstChild, className);
}
export function applyStyleClassToAll(className) {
    let body = document.getElementsByTagName('body')[0];
    applyStyleRecursive(body, className);
}

export async function fetchResults(url) {
    try {
        return (await fetchResponse(url)).text();
    } catch (error) {
        console.log('There was an error: ', error);
    }
}

export async function getJSON(url) {
    try {
        return (await fetchResponse(url)).json();
    } catch (error) {
        console.log('There was an error: ', error);
    }
}
export async function sleep(millis) {
    return new Promise((resolve) =>{
        setTimeout(()=> {
            resolve();
        }, millis)
    })
}