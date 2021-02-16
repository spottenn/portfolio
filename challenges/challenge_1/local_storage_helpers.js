export function readFromLocalStorage(key) {
    try {
        if (typeof key === 'string') {
            return JSON.parse(localStorage.getItem(key));
        }
    } catch (error) {
        console.error(error.message);
    }
    return null;
}

export function writeToLocalStorage(key, data) {
    let dataJson = JSON.stringify(data)
    if(typeof key === 'string' && typeof dataJson === 'string') {
        localStorage.setItem(key, dataJson)
    }
}
