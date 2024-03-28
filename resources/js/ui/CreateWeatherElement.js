import Config from "../utils/config.js";

class CreateWeatherElement{
    //creates a copy of the template, fills it with the fetched data and puts the copy in the right place inside the DOM
    create(weatherElement){
        var modifiedIconUrl = Config.ICON_URL.replace("$ICON_ID", weatherElement.icon),
            template = document.getElementById("weather-widget-template").content,
            copyHTML = document.importNode(template,true);
        copyHTML.querySelector(".widget").setAttribute("data-city", weatherElement.name) ;
        copyHTML.querySelector(".main").textContent = weatherElement.name;
        copyHTML.getElementById("minTempValue").textContent = weatherElement.minTemp;
        copyHTML.getElementById("maxTempValue").textContent = weatherElement.maxTemp;
        copyHTML.getElementById("humidity").textContent = weatherElement.humidity;
        copyHTML.getElementById("pressure").textContent = weatherElement.pressure;
        copyHTML.getElementById("windSpeed").textContent = weatherElement.windSpeed;
        copyHTML.getElementById("previewImage").src = modifiedIconUrl;
        copyHTML.getElementById("currentTemp").textContent = weatherElement.currentTemp;
      
        document.getElementById("listPosition").appendChild(copyHTML);
    }
}

export default CreateWeatherElement;