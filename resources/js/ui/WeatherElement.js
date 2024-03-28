class WeatherElement{

    constructor(name, currentTemp,minTemp,maxTemp,humidity,pressure,windSpeed, icon){
        this.name = name;
        this.currentTemp = currentTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windSpeed = windSpeed;
        this.icon = icon;
        //could integrate timestamp here by saving current time when element is created, 
        //then check the elemnts from localstorage on startup and compare the time(or check after an specified interval), 
        //if the timeDifference is big enough simply run updateDOM in Index.js, or delete the Element;
    }

}

export default WeatherElement;