var fetchButton = document.getElementById('fetch-button');
let APIKey = "4f98d51b3cf65b1d6a6eb628e4d0f9f5";

function getApi(lat, lon, city) {
    console.log("getApi")
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log("forecastdata = ", data);
      displayWeather(city, data);
    });
}
fetchButton.addEventListener('click', handleSearchClick);
function handleSearchClick(e){
    console.log("handleSearchClick")
    e.preventDefault();
    let submitInputEl= document.getElementById("cityInput");
    let city = submitInputEl.value.trim();
    console.log("city=",city)
    getGeoCoding(city);
}
 function getGeoCoding(city){
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKey}`
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log("data = ", data);
      let {lat} = data[0];
      let {lon} = data[0];
      getApi(lat, lon, city);
    });
 }
 function displayWeather(city, data){
    let date = (data.list[0].dt_txt).split(" ")[0];
    console.log("date = ", date);
    let dateEl = document.getElementById("city");
    dateEl.textContent = `${city}   ${date}`;
    let tempEl = document.getElementById("temp");
    tempEl.textContent = `Temp:  ${data.list[0].main.temp} deg F`;
    let windEl = document.getElementById("wind");
    windEl.textContent = `Wind:  ${data.list[0].wind.speed} MPH`
    let humidityEl = document.getElementById("humidity");
    humidityEl.textContent = `Humidity:  ${data.list[0].main.humidity} %`
 }