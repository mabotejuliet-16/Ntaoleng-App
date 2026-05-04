function updateWeatherData(response) {
  let temperatureElement = document.querySelector(".temp-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "2b73f4b12btfbe34cedefo9a6e8a2fb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}
function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let city = document.querySelector("#app-city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);
