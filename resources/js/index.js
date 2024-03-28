/* eslint-env browser */
import CreateWeatherElement from "./ui/CreateWeatherElement.js";
import WeatherElement from "./ui/WeatherElement.js";
import FetchWeather from "./api/FetchWeather.js";
import LocalStorageHandler from "./utils/LocalStorageHandler.js";
import HandleElements from "./utils/HandleElements.js";
import Config from "./utils/config.js";

var weatherFetcher,
    createdElement,
    messageElement,
    elementHandler;
let entryArray = []; //Array == Localstorage for easy manipulation of LocalStorage

function init() {
    weatherFetcher = new FetchWeather;
    createdElement = new CreateWeatherElement();
    messageElement = document.querySelector(".messages");
    elementHandler = new HandleElements;
    loadFromLocalStorage();
}

//if data is in localStorage, the data is loaded and put in new widgets
function loadFromLocalStorage() {
    let dataFromLocalStorage = LocalStorageHandler.readDataFromLocalStorage();
    if (checkStorage(dataFromLocalStorage)) {
        for (let i = 0; i < dataFromLocalStorage.length; i++) {
            let usableData = dataFromLocalStorage[i],
                currentTemp = usableData.currentTemp,
                name = usableData.name,
                minTemp = usableData.minTemp,
                maxTemp = usableData.maxTemp,
                humidity = usableData.humidity,
                pressure = usableData.pressure,
                windSpeed = usableData.windSpeed,
                icon = usableData.icon,
                weatherElement = new WeatherElement(name, currentTemp, minTemp, maxTemp, humidity, pressure, windSpeed, icon);

            entryArray.push(weatherElement);
            createdElement.create(weatherElement);
        }
    }
}

//checks if theres data in LocalStorage
function checkStorage(dataFromLocalStorage){
    if(dataFromLocalStorage === undefined | dataFromLocalStorage === null){ //sometimes its undefined, othertimes null?
        return false;
    }
    return true;
}

//starts Promise for fetch of WeatherAPI
function fetchWeatherData(input){
    weatherFetcher.getData(input).then(result => entryArray = elementHandler.fillAndCreateElement(result,input,entryArray));
}

//Checks if a city would be added two-times
function checkEntrys(checkElement){
    for(let i = 0;i < entryArray.length; i++){
        if(entryArray[i].name === checkElement){
            return true;
        }
    }
    return false;
}

function InputListener() {
    let InputField = document.getElementsByTagName("input");
    InputField[0].addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            messageElement.textContent ="";
            let input = InputField[0].value;
            InputField[0].value = "";
            if (!checkEntrys(input)) {
                fetchWeatherData(input);
            }
            
        }
    });
}

//adds clickListener to the whole document and compares the target id to identify the right elements
function buttonListener(){
    document.addEventListener("click", function(e){
        if(e.target.id === "up"){
            let tempElem = e.target.parentElement.parentElement.parentElement;
            e.target.classList.add("show-circle-animation");
            setTimeout(function(){e.target.classList.remove("show-circle-animation");}, Config.ROTATION_RESET_TIME);
            fetchWeatherData(tempElem.dataset.city); 
        }
        if(e.target.id === "del"){
            let tempElem = e.target.parentElement.parentElement.parentElement;
            for(let i = 0; i < entryArray.length; i++){
                if(entryArray[i].name === tempElem.dataset.city){
                    tempElem.classList.add("show-trash-animation");
                    setTimeout(function(){tempElem.remove();}, Config.TRASH_TIME_OUT);
                    entryArray.splice(i,1);
                    
                    localStorage.clear();
                    if(entryArray.length !== 0){ 
                        LocalStorageHandler.saveDataInLocalStorage(entryArray);
                    }
                }
            }           
        }
    });
}

//not necessary, here because I forgot an ".js" in Imports,but decided it would be more stable in case theres an unforseen problem
document.addEventListener("DOMContentLoaded", function() { 
    init();
    buttonListener();
    InputListener();
});

