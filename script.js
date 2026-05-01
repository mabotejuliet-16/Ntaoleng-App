function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let city = document.querySelector("#app-city");
  city.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);
