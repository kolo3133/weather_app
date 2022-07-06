// Getting elements from the DOM

const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temperature");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const submitButton = document.querySelector(".submit-btn");
const cities = document.querySelectorAll(".city");
const citiesList = document.querySelector(".cities");
const info = document.getElementById("list-empty");

// Default city when the page loads
let cityInput = "Warsaw";

// Add click event for each city in the panel
cities.forEach((i) => {
  i.addEventListener("click", (e) => {
    // Changing city name from default to the clicked one
    cityInput = e.target.innerHTML;
    console.log("click");
    fetchWeatherData();
    // Fade out animation
    // app.style.opacity = "0";
  });
});

//Add submit event for the form
form.addEventListener("submit", (e) => {
  // If search bar is empty message user with error
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    // Changing city from the default to the one written in the input field
    cityInput = search.value;
    fetchWeatherData();
    // reseting input value
    search.value = "";
    app.style.opacity = "0";
    // Prevents the default behaviour of the form
    e.preventDefault();
  }
});

// Function that returns day, month and a year
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// Function that is adding cities to last cities list
function changeCitiesList() {
  newCitiesListItem = nameOutput.textContent;

  const newListItem = document.createElement("li");
  newListItem.classList.add("city");
  newListItem.innerHTML = newCitiesListItem;
  citiesList.append(newListItem);

  info.classList.add("d-none");
}

// Function that fetches and displays the data from the weather API
function fetchWeatherData() {
  // fetching data from api
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=cb1f738212134808936150909222906&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Adding temoerature and weather condition to the page
      temp.innerHTML = data.current.feelslike_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      //   Getting date and time of the city
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      //   Reformating the date format
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
      timeOutput.innerHTML = time;
      // Adding name of the city into the page
      nameOutput.innerHTML = data.location.name;
      // Adding the weather details into the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      app.style.opacity = "1";

      changeCitiesList();
    });
}
