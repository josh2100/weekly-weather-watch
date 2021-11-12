// Start with displaying the day
const todayEl = document.querySelector("#today");
const textAreaEl = document.querySelector("textarea");
const cityNameEl = document.querySelector("#cityName");
const formEl = document.querySelector("#cityForm");
const searchInput = document.querySelector("input");

let cityQuery = "";
let latitude = "";
let longitude = "";
const now = dayjs();

// api key cdda6b75856c86ce1bea221c999009fa
// API nightmares
// const asia =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=45&lon=93&appid=cdda6b75856c86ce1bea221c999009fa";
// const chaiaIsAlwaysRight =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=45&lon=93&exclude=minutely&appid=cdda6b75856c86ce1bea221c999009fa";
// var fiveDayMinneapolis =
//   "https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial";
//   doc example api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
const currentWeatherDataApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;
const oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cdda6b75856c86ce1bea221c999009fa`;

todayEl.textContent = now;

// Search for city
const searchCity = (event) => {
  // Prevent refresh screen
  event.preventDefault();

  cityQuery = searchInput.value.trim();

  getCurrentWeatherData();
  // getWeather(asia);
};

// saving getWeather only for testing purposes
const getWeather = function (api) {
  // Make a request to the url
  fetch(api)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
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

const getCurrentWeatherData = function () {
  let cityApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;

  // Make a request to the url
  fetch(cityApi)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          // set latitude
          latitude = data.city.coord.lat;
          // set longitude
          longitude = data.city.coord.lon;

          displayWeatherData(data);
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

const getOneCallData = function () {
  // create onecallapi var
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cdda6b75856c86ce1bea221c999009fa`;
  // let cityApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;

  // Make a request to the url
  fetch(oneCallApi)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
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

const displayWeatherData = function (data) {
  // run second api function asynchronously
  getOneCallData();

  console.log(data);
  console.log(latitude);
  console.log(longitude);
  // console.log(data.city.country);
  // console.log("current temp is");
  // console.log(data.list[0].main.temp);
  // console.log("wind speed is");
  // console.log(data.list[0].wind.speed);
  // console.log("current humidity is");
  // console.log(data.list[0].main.humidity);
  // uv index??
  // console.log("the current temp is");
  // console.log(data.list[0]);
  // console.log(data.coord.lat);
};
// Event listener for search button
cityForm.addEventListener("submit", searchCity);
