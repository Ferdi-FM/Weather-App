import Config from "./config.js";

function saveDataInLocalStorage(entriesArray){
    localStorage.setItem(Config.KEY_FOR_LOCAL_STORAGE, JSON.stringify(entriesArray));
}

function readDataFromLocalStorage(){
    let dataAsJson = localStorage.getItem(Config.KEY_FOR_LOCAL_STORAGE);
    if(dataAsJson !== undefined){
        return JSON.parse(dataAsJson);
    }
    return undefined;
}

export default {saveDataInLocalStorage,readDataFromLocalStorage};