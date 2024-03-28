import CreateWeatherElement from "../ui/CreateWeatherElement.js";
import WeatherElement from "../ui/WeatherElement.js";
import Config from "./config.js";
import LocalStorageHandler from "./LocalStorageHandler.js";

var messageElement,
    inputField;

class HandleElements{
    
    constructor(){
        this.createdElement = new CreateWeatherElement;
        messageElement = document.querySelector(".messages");
        inputField = document.getElementsByClassName("widget add-item")[0];
    }

    //creates the Widgets, but before that it checks  if a valid response was made, else a error is shown and animated
    fillAndCreateElement(result,input, entryArray){
        if(result.MinTemp === undefined){
            setTimedMessage(result.message);
            inputField.classList.add("show-error-animation");
            setTimeout(function(){inputField.classList.remove("show-error-animation");}, Config.MESSAGE_TIME_OUT);
            return entryArray;
        }
        let currentTemp = result.CurTemp,
            minTemp = result.MinTemp,
            maxTemp = result.MaxTemp,
            humidity = result.Humidity,
            pressure = result.Pressure,
            windSpeed = result.WindSpeed, 
            icon = result.Icon,        
            weatherElement = new WeatherElement(input, currentTemp, minTemp ,maxTemp , humidity, pressure, windSpeed, icon); 
        for(let i = 0; i < entryArray.length; i++){
            if(entryArray[i].name === input){
                updateDomElement(input,weatherElement);
                setTimedMessage("finished updating!"); //to have any kind of feedback for your click(if the data stays the same)
                return entryArray;
            }
        }
        this.createdElement.create(weatherElement);
        
        entryArray.push(weatherElement);
        LocalStorageHandler.saveDataInLocalStorage(entryArray);
        return entryArray;
    }

}

//creates a timed Message in the Message DOM-Element
function setTimedMessage(message){
    messageElement.textContent = message;
    setTimeout(function(){messageElement.textContent = "";}, Config.MESSAGE_TIME_OUT);
}

//wanted to really update existing DOM-Element rather than delete it and recreate it
function updateDomElement(input,weatherElement1){
    let modifiedIconUrl = Config.ICON_URL.replace("$ICON_ID", weatherElement1.icon);
    document.querySelector("[data-city='" + input +"']").querySelector(".main").textContent = weatherElement1.name;
    document.querySelector("[data-city='" + input +"']").querySelector("#minTempValue").textContent = weatherElement1.minTemp;
    document.querySelector("[data-city='" + input +"']").querySelector("#maxTempValue").textContent = weatherElement1.maxTemp;
    document.querySelector("[data-city='" + input +"']").querySelector("#humidity").textContent = weatherElement1.humidity;
    document.querySelector("[data-city='" + input +"']").querySelector("#pressure").textContent = weatherElement1.pressure;
    document.querySelector("[data-city='" + input +"']").querySelector("#windSpeed").textContent = weatherElement1.windSpeed;
    document.querySelector("[data-city='" + input +"']").querySelector("#previewImage").src = modifiedIconUrl;
    document.querySelector("[data-city='" + input +"']").querySelector("#currentTemp").textContent = weatherElement1.currentTemp;
    //could have checked entryarray for the entry to edit ->  use createWeatherElement and put the new weatherElement 
    //at the same index in the entryarray as the old.
}

export default HandleElements;