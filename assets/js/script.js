const cityNameEl = document.querySelector("#cityName");
const formEl = document.querySelector("#cityForm");
const leftSideContainerEl = document.querySelector("#left-side");
const searchInput = document.querySelector("input");
const recentSearchesEl = document.querySelector("#recent-searches");

const currentTempEl = document.querySelector("#current-temp");
const currentUviEl = document.querySelector("#current-uvi");
const currentWindEl = document.querySelector("#current-wind");
const currentHumidityEl = document.querySelector("#current-humidity");

let cityQuery = "";
let latitude = "";
let longitude = "";
let recentSearches = [];

const buildDate = (addedDays) => {
  //https://stackoverflow.com/questions/3572561/set-date-10-days-in-the-future-and-format-to-dd-mm-yyyy-e-g-21-08-2010
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + addedDays);

  const dd = targetDate.getDate();
  const mm = targetDate.getMonth() + 1;
  const yyyy = targetDate.getFullYear();

  const dateString = `${mm}/${dd}/${yyyy}`;

  return dateString;
};

const searchCity = (event) => {
  // Prevent refresh screen
  event.preventDefault();

  // Trim whitespace
  cityQuery = searchInput.value.trim();

  // saveRecentSearches();

  getCurrentWeatherData();
};

const getCurrentWeatherData = () => {
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
          // Update city name and today's date
          cityNameEl.textContent = `${data.city.name} ${buildDate(0)}`;
          // Save successful search
          saveRecentSearches();
          displayRecentSearches();
          getOneCallData();
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

const getOneCallData = () => {
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=cdda6b75856c86ce1bea221c999009fa`;

  // Make a request to the url
  fetch(oneCallApi)
    .then(function (response) {
      // Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // Insert Current Weather Data
          currentTempEl.textContent = `Current Temp: ${data.current.temp} °F`;
          currentUviEl.textContent = `UV Index: ${data.current.uvi}`;
          currentWindEl.textContent = `Wind: ${data.current.wind_speed} MPH`;
          currentHumidityEl.textContent = `Humidity: ${data.current.humidity}%`;
          /// NEEDS CURRENT ICON
          // Insert weather data for 5 day forecast
          for (let day = 0; day < 5; day++) {
            let icon = data.daily[day].weather[0].icon;

            document.querySelector(
              `#day${day} div:nth-child(2)`
            ).innerHTML = `<img src = http://openweathermap.org/img/wn/${icon}.png />`;

            document.querySelector(
              `#day${day} div:nth-child(3)`
            ).textContent = `Temp: ${Math.round(data.daily[day].temp.day)} °F`;

            document.querySelector(
              `#day${day} div:nth-child(4)`
            ).textContent = `Wind: ${Math.round(
              data.daily[day].wind_speed
            )} MPH`;

            document.querySelector(
              `#day${day} div:nth-child(5)`
            ).textContent = `Humidity: ${Math.round(
              data.daily[day].humidity
            )}%`;
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

const loadRecentSearches = () => {
  city = JSON.parse(localStorage.getItem("city"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!city) {
    recentSearches = [];
  } else {
    recentSearches = JSON.parse(localStorage.getItem("city"));
  }
};

const saveRecentSearches = () => {
  checkIfAlreadyAdded = function () {
    for (let index = 0; index < recentSearches.length; index++) {
      if (cityQuery == recentSearches[index]) {
        return true;
      }
    }
  };

  if (recentSearches.some(checkIfAlreadyAdded)) {
  } else {
    // Add to beginning of list
    recentSearches.unshift(cityQuery);
  }

  localStorage.setItem("city", JSON.stringify(recentSearches));
};

const displayRecentSearches = () => {
  // Clear out old content
  recentSearchesEl.textContent = "";

  for (let i = 0; i < 10; i++) {
    if (recentSearches[i]) {
      // Make a button
      let newSearchButton = document.createElement("button");
      // Give it the text of a search term in uppercase
      let recentSearch = document.createTextNode(
        recentSearches[i].toUpperCase()
      );
      // Add it to recent search section and add classes
      newSearchButton.appendChild(recentSearch);
      newSearchButton.classList.add("rounded", "p-1", "m-1");
      recentSearchesEl.appendChild(newSearchButton);

      // Add event listener to new search button
      newSearchButton.addEventListener("click", function (event) {
        searchInput.value = event.target.innerHTML.toLowerCase();
      });
    } else {
      break;
    }
  }
};

// Event listener for search button
cityForm.addEventListener("submit", searchCity);

// Fill in todays date and 5 day forecast dates
cityNameEl.textContent = buildDate(0);

for (let day = 0; day < 5; day++) {
  document.querySelector(`#day${day} div:nth-child(1)`).textContent = buildDate(
    day + 1
  );
}

loadRecentSearches();
displayRecentSearches();
