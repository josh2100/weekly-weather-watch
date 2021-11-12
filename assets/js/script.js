// Start with displaying the day
const todayEl = document.querySelector("#today");
const textAreaEl = document.querySelector("textarea");
const cityNameEl = document.querySelector("#cityName");
const formEl = document.querySelector("#cityForm");
const searchInput = document.querySelector("input");
let cityQuery = "";
const now = dayjs();

// api key cdda6b75856c86ce1bea221c999009fa
// API nightmares
const asia =
  "https://api.openweathermap.org/data/2.5/onecall?lat=45&lon=93&appid=cdda6b75856c86ce1bea221c999009fa";
const chaiaIsAlwaysRight =
  "https://api.openweathermap.org/data/2.5/onecall?lat=45&lon=93&exclude=minutely&appid=cdda6b75856c86ce1bea221c999009fa";
var fiveDayMinneapolis =
  "https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial";
//   doc example api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
const dynamicApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;

todayEl.textContent = now;

// Search for city
const searchCity = function (event) {
  // Prevent refresh screen
  event.preventDefault();

  cityQuery = searchInput.value.trim();
  console.log(cityQuery);

  getDynamicWeather();
};

// saving getWeather only for testing purposes
const getWeather = function (api) {
  // Make a request to the url
  fetch(api)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        // Use modal instead of alert
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

const getDynamicWeather = function () {
  let cityApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;

  // Make a request to the url
  fetch(cityApi)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          ///test
          //   console.log(data);
          //   console.log(data.city.population);
          console.log(data.list[0].wind.speed);
          console.log(data.list[1].wind.speed);
        });
      } else {
        // Use modal instead of alert
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// Event listener for search button
cityForm.addEventListener("submit", searchCity);
