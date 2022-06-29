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

// Default city when the page loads
let cityInput = "Warsaw";
