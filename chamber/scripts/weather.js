-7.223214672568764, -35.87062419378239;
const urlCurrent =
  "https://api.openweathermap.org/data/2.5/weather?lat=-7.223214672568764&lon=-35.87062419378239&appid=975cc2230a3d8b541d90a9cfe74a447d&units=imperial";

const urlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?cnt=17&lat=-7.223214672568764&lon=-35.87062419378239&appid=975cc2230a3d8b541d90a9cfe74a447d&units=imperial";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;

  return formattedTime;
};

const getWeekDay = (dateString) => {
  const date = new Date(dateString);

  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Today";
  } else {
    const dayOfWeekNumber = date.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
    return dayOfWeekName;
  }
};

const insertCurrentWeatherData = (data) => {
  const currentTemp = document.querySelector(".current-temp");
  const clouds = document.querySelector(".clouds");
  const high = document.querySelector(".weather-high");
  const low = document.querySelector(".weather-low");
  const humidity = document.querySelector(".weather-humidity");
  const sunrise = document.querySelector(".weather-sunrise");
  const sunset = document.querySelector(".weather-sunset");
  const icon = document.querySelector("#weather-icon");

  currentTemp.innerHTML = data.main.temp;
  clouds.innerHTML = data.weather[0].description;
  high.innerHTML = data.main.temp_max;
  low.innerHTML = data.main.temp_min;
  humidity.innerHTML = data.main.humidity;
  sunrise.innerHTML = formatDate(data.sys.sunrise);
  sunset.innerHTML = formatDate(data.sys.sunset);
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
};

const insertForecastData = (data) => {
  const today = document.querySelector(".today");
  const tomorrow = document.querySelector(".tomorrow");
  const dayAfter = document.querySelector(".day-after");

  today.innerHTML = `${getWeekDay(data.list[0].dt_txt)}: <b>${
    data.list[0].main.temp
  }ºF</b>`;
  tomorrow.innerHTML = `${getWeekDay(data.list[8].dt_txt)}: <b>${
    data.list[8].main.temp
  }ºF</b>`;
  dayAfter.innerHTML = `${getWeekDay(data.list[16].dt_txt)}: <b>${
    data.list[16].main.temp
  }ºF</b>`;
};
const getWeather = async (type) => {
  try {
    const res = await fetch(type === "current" ? urlCurrent : urlForecast);
    const data = await res.json();
    type === "current"
      ? insertCurrentWeatherData(data)
      : insertForecastData(data);
  } catch (err) {
    throw new Error("Error getting data");
  }
};

getWeather("current");
getWeather("forecast");
