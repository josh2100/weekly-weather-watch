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

// const daytemp = document.querySelector(`#day${numDay} div:nth-child(3)`);

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

const getCurrentWeatherData = function () {
  let cityApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=cdda6b75856c86ce1bea221c999009fa&units=imperial`;

  // Make a request to the url
  fetch(cityApi)
    .then(function (response) {
      // If request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // Set latitude
          latitude = data.city.coord.lat;
          // Set longitude
          longitude = data.city.coord.lon;
          // Update city name
          cityNameEl.textContent = `${data.city.name} ${now}`;

          //test section data.list[i].dt_txt

          for (let day = 0; day < 5; day++) {
            document.querySelector(
              `#day${day} div:nth-child(1)`
            ).textContent = `date`;
          }

          //test section

          console.log(data);
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
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=cdda6b75856c86ce1bea221c999009fa`;

  // Make a request to the url
  fetch(oneCallApi)
    .then(function (response) {
      // Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          currentTempEl.textContent = `Current Temp: ${data.current.temp} °F`;
          currentUviEl.textContent = `UV Index: ${data.current.uvi}`;
          currentWindEl.textContent = `Wind: ${data.current.wind_speed} MPH`;
          currentHumidityEl.textContent = `Humidity: ${data.current.humidity}%`;

          for (let day = 0; day < 5; day++) {
            document.querySelector(
              `#day${day} div:nth-child(3)`
            ).textContent = `Temp: ${Math.round(data.daily[day].temp.day)} °F`;
          }

          for (let day = 0; day < 5; day++) {
            document.querySelector(
              `#day${day} div:nth-child(4)`
            ).textContent = `Wind: ${Math.round(
              data.daily[day].wind_speed
            )} MPH`;
          }

          for (let day = 0; day < 5; day++) {
            document.querySelector(
              `#day${day} div:nth-child(5)`
            ).textContent = `Humidity: ${Math.round(
              data.daily[day].humidity
            )}%`;
          }

          //test section
          //test section
        });
      } else {
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
