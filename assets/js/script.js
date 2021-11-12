// Start with displaying the day
const todayEl = document.querySelector("#today");

// const textAreaEl = document.querySelector("textarea");
const cityNameEl = document.querySelector("#cityName");
const formEl = document.querySelector("#cityForm");
const searchInput = document.querySelector("input");

const currentTempEl = document.querySelector("#current-temp");
const currentUviEl = document.querySelector("#current-uvi");
const currentWindEl = document.querySelector("#current-wind");
const currentHumidityEl = document.querySelector("#current-humidity");

let cityQuery = "";
let latitude = "";
let longitude = "";
let now = dayjs();

const currentWeatherDataApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;
const oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cdda6b75856c86ce1bea221c999009fa`;

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
        response.json().then(function (data) {});
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
        response.json().then(function (data) {
          // set latitude
          latitude = data.city.coord.lat;
          // set longitude
          longitude = data.city.coord.lon;
          ///test
          console.log(data);
          // cityNameEl.textContent = data.city.name;
          cityNameEl.textContent = `${data.city.name} ${now}`;

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
  // let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cdda6b75856c86ce1bea221c999009fa`;
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=cdda6b75856c86ce1bea221c999009fa`;

  // Make a request to the url
  fetch(oneCallApi)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          currentTempEl.textContent = `Current Temp: ${data.current.temp} °F`;
          currentUviEl.textContent = `UV Index: ${data.current.uvi}`;
          currentWindEl.textContent = `Wind: ${data.current.wind_speed} MPH`;
          currentHumidityEl.textContent = `Humidity: ${data.current.humidity}%`;
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

  // console.log(data);
  // console.log(latitude);
  // console.log(longitude);
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
