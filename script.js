function updateWeatherData(response) {
  let temperatureElement = document.querySelector(".temp-value");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#app-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconImage = document.querySelector(".temp-emoji");

  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji" />`;
  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

function searchCity(city) {
  let apiKey = "2b73f4b12btfbe34cedefo9a6e8a2fb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}
function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return days[date.getDay()];  
}
function getForecast(city) {
  let apiKey = "2b73f4b12btfbe34cedefo9a6e8a2fb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  
  

  let forecastHtml = "";

    response.data.daily.forEach(function (day,index) {
      if (index <5) {
    forecastHtml =
    forecastHtml + 
    `
            <li class="day">
              <div class="date">${formatDay(day.time)}</div> 
              <div ><img src="${day.condition.icon_url}"class="icon"/></div> 
              <div class="temps"><strong>${Math.round(day.temperature.maximum)}°</strong> ${Math.round(day.temperature.minimum)}°</div> </li>
              `;
      }
  });

let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

searchCity("Johannesburg");
displayForecast();
