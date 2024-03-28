/* eslint-env browser */
import Config from "../utils/config.js";

class FetchWeather {

    getData(input){
        return new Promise(function(resolve){
            fetchData(input).then(result => resolve(result));
        });
    }
}

//gets the Relevant data from the JSON-Response
function getRelevantData(weatherData){
    if(weatherData.message !== undefined){ //checks if the API gave back an error, because cityName wasn't recognised and gives back this "error-json"
        return weatherData;
    }
    let relevantResult = {
        CurTemp: Math.round(weatherData.main.temp),
        MinTemp: weatherData.main.temp_min,
        MaxTemp: weatherData.main.temp_max,
        Humidity: weatherData.main.humidity,
        Pressure: weatherData.main.pressure,
        WindSpeed: weatherData.wind.speed,
        Icon: weatherData.weather[0].icon,
    };
    return(relevantResult);
}

function fetchData(input){
    return new Promise(function (resolve){
        let url = Config.FETCH_CURRENT_WEATHER_URL.replace("$CITY", input).replace("$API_KEY", Config.API_KEY);
            fetch(url).then(response => response.json().then(function(result){
                resolve(getRelevantData(result));
            }));
    });
}

export default FetchWeather;