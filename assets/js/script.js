// Start with displaying the day
const todayEl = document.querySelector("#today");
const textAreaEl = document.querySelector("textarea");
const cityNameEl = document.querySelector("#cityName");
const formEl = document.querySelector("#cityForm");
const searchInput = document.querySelector("input");

let cityQuery = "";
const now = dayjs();

todayEl.textContent = now;

// Search for city
const searchCity = function (event) {
  // Prevent refresh screen
  event.preventDefault();

  cityQuery = searchInput.value.trim();
  console.log(cityQuery);
};

// Event listener for search button
cityForm.addEventListener("submit", searchCity);
