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
function handleHistorySearch(e){
    e.preventDefault();
    let city = e.target.dataset.search
    getGeoCoding(city);
}

function displayHistory(){
    let historyDiv = document.getElementById("searchHistory");
    historyDiv.innerHTML = "";

    for(let i = searchHistory.length -1; i >= 0; i--){
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.addEventListener("click", handleHistorySearch)
        btn.setAttribute("data-search", searchHistory[i]); 
        btn.textContent = searchHistory[i];
        historyDiv.append(btn)
    }
}
function getApi(lat, lon, city) {
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
    e.preventDefault();
    let submitInputEl= document.getElementById("cityInput");
    let city = submitInputEl.value.trim();
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
    document.getElementById("city").innerHTML = `${city}    ${data.list[0].dt_txt.split(" ")[0]}`;
    document.getElementById("icon").src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    document.getElementById("icon").alt = `${data.list[0].weather[0].description}`;
    document.getElementById("temp").innerHTML = `Temp:  ${data.list[0].main.temp} deg F`;
    document.getElementById("wind").innerHTML = `Wind:  ${data.list[0].wind.speed} MPH`;
    document.getElementById("humidity").innerHTML = `Humidity:  ${data.list[0].main.humidity} %`;
 }
 
 function fiveDayForecast(data){
    document.getElementById("dateDayOne").innerHTML = `${data.list[7].dt_txt.split(" ")[0]}`;
    document.getElementById("iconDayOne").src = `https://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`;
    document.getElementById("iconDayOne").alt = `${data.list[7].weather[0].description}`;
    document.getElementById("tempDayOne").innerHTML = `Temp:  ${data.list[7].main.temp} deg F`;
    document.getElementById("windDayOne").innerHTML = `Wind:  ${data.list[7].wind.speed} MPH`;
    document.getElementById("humidityDayOne").innerHTML = `Humidity:  ${data.list[7].main.humidity} %`;
    document.getElementById("dayOne").classList.add('bg-dark');
    document.getElementById("dayOne").classList.add('text-light');

    document.getElementById("dateDayTwo").innerHTML = `${data.list[15].dt_txt.split(" ")[0]}`;
    document.getElementById("iconDayTwo").src = `https://openweathermap.org/img/w/${data.list[15].weather[0].icon}.png`;
    document.getElementById("iconDayTwo").alt = `${data.list[15].weather[0].description}`;
    document.getElementById("tempDayTwo").innerHTML = `Temp:  ${data.list[15].main.temp} deg F`;
    document.getElementById("windDayTwo").innerHTML = `Wind:  ${data.list[15].wind.speed} MPH`;
    document.getElementById("humidityDayTwo").innerHTML = `Humidity:  ${data.list[15].main.humidity} %`;
    document.getElementById("dayTwo").classList.add('bg-dark');
    document.getElementById("dayTwo").classList.add('text-light');

    document.getElementById("dateDayThree").innerHTML = `${data.list[23].dt_txt.split(" ")[0]}`;
    document.getElementById("iconDayThree").src = `https://openweathermap.org/img/w/${data.list[23].weather[0].icon}.png`;
    document.getElementById("iconDayThree").alt = `${data.list[23].weather[0].description}`;
    document.getElementById("tempDayThree").innerHTML = `Temp:  ${data.list[23].main.temp} deg F`;
    document.getElementById("windDayThree").innerHTML = `Wind:  ${data.list[23].wind.speed} MPH`;
    document.getElementById("humidityDayThree").innerHTML = `Humidity:  ${data.list[23].main.humidity} %`;
    document.getElementById("dayThree").classList.add('bg-dark');
    document.getElementById("dayThree").classList.add('text-light');


    document.getElementById("dateDayFour").innerHTML = `${data.list[31].dt_txt.split(" ")[0]}`;
    document.getElementById("iconDayFour").src = `https://openweathermap.org/img/w/${data.list[31].weather[0].icon}.png`;
    document.getElementById("iconDayFour").alt = `${data.list[31].weather[0].description}`;
    document.getElementById("tempDayFour").innerHTML = `Temp:  ${data.list[31].main.temp} deg F`;
    document.getElementById("windDayFour").innerHTML = `Wind:  ${data.list[31].wind.speed} MPH`;
    document.getElementById("humidityDayFour").innerHTML = `Humidity:  ${data.list[31].main.humidity} %`;
    document.getElementById("dayFour").classList.add('bg-dark');
    document.getElementById("dayFour").classList.add('text-light');

    document.getElementById("dateDayFive").innerHTML = `${data.list[39].dt_txt.split(" ")[0]}`;
    document.getElementById("iconDayFive").src = `https://openweathermap.org/img/w/${data.list[39].weather[0].icon}.png`;
    document.getElementById("iconDayFive").alt = `${data.list[39].weather[0].description}`;
    document.getElementById("tempDayFive").innerHTML = `Temp:  ${data.list[39].main.temp} deg F`;
    document.getElementById("windDayFive").innerHTML = `Wind:  ${data.list[39].wind.speed} MPH`;
    document.getElementById("humidityDayFive").innerHTML = `Humidity:  ${data.list[39].main.humidity} %`;
    document.getElementById("dayFive").classList.add('bg-dark');
    document.getElementById("dayFive").classList.add('text-light');

 }
let storedCities = localStorage.getItem("searchHistory")
if (storedCities){
    searchHistory = JSON.parse(storedCities);
}
displayHistory();

