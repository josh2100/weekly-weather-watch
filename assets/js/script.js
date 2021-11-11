// start with displaying the day
const todayEl = document.querySelector("#today");
const textAreaEl = document.querySelector("textarea");
const cityNameEl = document.querySelector("#cityName");
const buttonEl = document.querySelector("#searchButton");
const now = dayjs();

todayEl.textContent = now;

// Search for city
const searchCity = function () {
  console.log("click registered");
  console.log(textAreaEl.val);
};

// Event listener for search button
buttonEl.onclick = searchCity();
