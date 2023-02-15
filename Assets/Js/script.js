var fetchButton = document.getElementById('fetch-button');
let APIKey = "4f98d51b3cf65b1d6a6eb628e4d0f9f5";
let searchHistory = [];

function addSearchHistory(city){
    if(searchHistory.indexOf(city) !== -1){
        return;
    }
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displayHistory();
}
function displayHistory(){
    let historyDiv = document.getElementById("searchHistory");
    historyDiv.innerHTML = "";

    for(let i = searchHistory.length -1; i >= 0; i--){
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");

        btn.setAttribute("data-search", searchHistory[i]); 
        btn.textContent = searchHistory[i];
        historyDiv.append(btn)
    }
}
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
      fiveDayForecast(data);
      addSearchHistory(city);
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
    windEl.textContent = `Wind:  ${data.list[0].wind.speed} MPH`;
    let humidityEl = document.getElementById("humidity");
    humidityEl.textContent = `Humidity:  ${data.list[0].main.humidity} %`;
 }
 
 function fiveDayForecast(data){
    let dateDayOneEl = document.getElementById("dateDayOne");
    dateDayOneEl.textContent = `${data.list[7].dt_txt.split(" ")[0]}`;
    // let iconDayOne = document.createElement("img");
    let iconDayOne = document.getElementById("iconDayOne")
    let iconUrl = `https://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`;
    iconDayOne.setAttribute ('src', iconUrl);
    let iconDescription = data.list[7].weather[0].description;
    iconDayOne.setAttribute ('alt', iconDescription);
    let tempDayOneEl = document.getElementById("tempDayOne");
    tempDayOneEl.textContent = `Temp:  ${data.list[7].main.temp} deg F`;
    // dateDayOneEl.append (iconDayOne);
    let windDayOneEl = document.getElementById("windDayOne");
    windDayOneEl.textContent = `Wind:  ${data.list[7].wind.speed} MPH`;
    let humidityDayOneEl = document.getElementById("humidityDayOne");
    humidityDayOneEl.textContent = `Humidity:  ${data.list[7].main.humidity} %`;

    let dateDayTwoEl = document.getElementById("dateDayTwo");
    dateDayTwoEl.textContent = `${data.list[15].dt_txt.split(" ")[0]}`;
    // let iconDayTwoEl = document.getElementById("iconDayTwo");
    // iconDayTwoEl.textContent = `${data.list[16].weather[0].icon}`;
    let tempDayTwoEl = document.getElementById("tempDayTwo");
    tempDayTwoEl.textContent = `Temp:  ${data.list[15].main.temp} deg F`;
    let windDayTwoEl = document.getElementById("windDayTwo");
    windDayTwoEl.textContent = `Wind:  ${data.list[15].wind.speed} MPH`;
    let humidityDayTwoEl = document.getElementById("humidityDayTwo");
    humidityDayTwoEl.textContent = `Humidity:  ${data.list[15].main.humidity} %`;

    let dateDayThreeEl = document.getElementById("dateDayThree");
    dateDayThreeEl.textContent = `${data.list[23].dt_txt.split(" ")[0]}`;
    // let iconDayThreeEl = document.getElementById("iconDayThree");
    // iconDayThreeEl.textContent = `${data.list[24].weather[0].icon}`;
    let tempDayThreeEl = document.getElementById("tempDayThree");
    tempDayThreeEl.textContent = `Temp:  ${data.list[23].main.temp} deg F`;
    let windDayThreeEl = document.getElementById("windDayThree");
    windDayThreeEl.textContent = `Wind:  ${data.list[24].wind.speed} MPH`;
    let humidityDayThreeEl = document.getElementById("humidityDayThree");
    humidityDayThreeEl.textContent = `Humidity:  ${data.list[24].main.humidity} %`;

    let dateDayFourEl = document.getElementById("dateDayFour");
    dateDayFourEl.textContent = `${data.list[32].dt_txt.split(" ")[0]}`;
    // let iconDayFourEl = document.getElementById("iconDayFour");
    // iconDayFourEl.textContent = `${data.list[32].weather[0].icon}`;
    let tempDayFourEl = document.getElementById("tempDayFour");
    tempDayFourEl.textContent = `Temp:  ${data.list[32].main.temp} deg F`;
    let windDayFourEl = document.getElementById("windDayFour");
    windDayFourEl.textContent = `Wind:  ${data.list[32].wind.speed} MPH`;
    let humidityDayFourEl = document.getElementById("humidityDayFour");
    humidityDayFourEl.textContent = `Humidity:  ${data.list[32].main.humidity} %`;

    let dateDayFiveEl = document.getElementById("dateDayFive");
    dateDayFiveEl.textContent = `${data.list[39].dt_txt.split(" ")[0]}`;
    // let iconDayFiveEl = document.getElementById("iconDayFive");
    // iconDayFiveEl.textContent = `${data.list[39].weather[0].icon}`;
    let tempDayFiveEl = document.getElementById("tempDayFive");
    tempDayFiveEl.textContent = `Temp:  ${data.list[39].main.temp} deg F`;
    let windDayFiveEl = document.getElementById("windDayFive");
    windDayFiveEl.textContent = `Wind:  ${data.list[39].wind.speed} MPH`;
    let humidityDayFiveEl = document.getElementById("humidityDayFive");
    humidityDayFiveEl.textContent = `Humidity:  ${data.list[39].main.humidity} %`;
  
 }
