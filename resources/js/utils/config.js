const Config = {
      API_KEY : "4215f68211e5d54bd140efcdfe44be66",
      FETCH_CURRENT_WEATHER_URL : "https://api.openweathermap.org/data/2.5/weather?q=$CITY,DE&appid=$API_KEY&lang=DE&units=metric",
      ICON_URL : "http://openweathermap.org/img/wn/$ICON_ID@2x.png",
      KEY_FOR_LOCAL_STORAGE : "WEATHERELEMENTS",
      MESSAGE_TIME_OUT : 3000,
      ROTATION_RESET_TIME : 2000,
      TRASH_TIME_OUT : 1000,
};

export default Config;