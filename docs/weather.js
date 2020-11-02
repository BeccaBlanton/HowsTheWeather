/*GIVEN a weather dashboard with form inputs
√WHEN I search for a city
√THEN I am presented with current and future conditions for that city and that city is added to the search history
√WHEN I view current weather conditions for that city
√THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
√WHEN I view future weather conditions for that city
√THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
√WHEN I click on a city in the search history
√THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast*/

//Form created on side of Website for Searching Cities
//Stores previous searches in a search history below search bar
//previous cities at buttons that link back to their dashbaord

//once Searched Posts City and Date in Header
//initial cities in search bar
var cities = ['Los Angeles', 'New York', 'San Francisco', 'Chicago'];
//variables for current date and the date for next 5 days for the 5 day forecast
var currentDate = moment().format('L');
var oneDayOut = moment().add(1, 'days').calendar("L"); 
var twoDaysOut = moment().add(2, 'days').calendar("L"); 
var threeDaysOut = moment().add(3, 'days').calendar("L"); 
var fourDaysOut = moment().add(4, 'days').calendar("L"); 
var fiveDaysOut = moment().add(5, 'days').calendar("L"); 
//generates starting Weather Info with Sacrmento as base
function displayWeatherInfo(){
  $("#mainWeatherInfo").empty();
  $(".dayOneCard").empty();
  $(".dayTwoCard").empty();
  $(".dayThreeCard").empty();
  $(".dayFourCard").empty();
  $(".dayFiveCard").empty();

   // var city = $(this).attr("data-name")
  var city="sacramento"
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5feeeec9e5f2ebf79547fc8775da3160";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var tempF= Math.floor(((response.list[0].main.temp)-273.15) * 1.8 + 32)
    var weatherIcon = "http://openweathermap.org/img/w/"+ response.list[0].weather[0].icon +".png"
    console.log(weatherIcon)
    var cityHeader = $(`<h1>${response.city.name +" " + currentDate}<img src=${weatherIcon}></h1>`)
    var temperature = $(`<h3>${"Temperature: " + tempF + "°F"}</h3>`)
    var humidity = $(`<h3>${"Humidity: " + response.list[0].main.humidity + "%"}</h3>`)
    var windSpeed = $(`<h3>${"Wind Speed: " + response.list[0].wind.speed + " MPH"}</h3>`)
    var lat = response.city.coord.lat
    var lon = response.city.coord.lon
    console.log(lat)
    console.log(lon)
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=alerts&appid=5feeeec9e5f2ebf79547fc8775da3160";
    $.ajax({
    url: queryURL2,
      method: "GET"
      }).then(function(response) {
      console.log(response)
      var uvIndex = response.current.uvi
      var uvDiv = $(`<h3>`)
      $('#mainWeatherInfo').append(uvDiv)
      uvDiv.text("UV Index: "+ uvIndex)
      console.log(uvIndex)
      if(uvIndex > 5){
        $(uvDiv).addClass('severe')
      } else if(uvIndex < 5 && uvIndex > 2){
        $(uvDiv).addClass('moderate')
      }else{
        $(uvDiv).addClass('favorable')
      }
      
        })




    $('#mainWeatherInfo').append(cityHeader, temperature, humidity, windSpeed)
    console.log(queryURL)
    console.log(response)

    var dayOne = $(`<h5>${oneDayOut}</h5>`)
    var dayOneTemp = $(`<li>${"Temp: " + Math.floor(((response.list[7].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayOneIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[8].weather[0].icon +".png"}></li>`)
    var dayOneHumidity= $(`<li>${"Humidity: " + response.list[7].main.humidity + "%"}</li>`)
    $('.dayOneCard').append(dayOne, dayOneTemp,dayOneIcon, dayOneHumidity)

    var dayTwo = $(`<h5>${twoDaysOut}</h5>`)
    var dayTwoTemp = $(`<li>${"Temp: " + Math.floor(((response.list[15].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayTwoIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[16].weather[0].icon +".png"}></li>`)
    var dayTwoHumidity= $(`<li>${"Humidity: " + response.list[15].main.humidity + "%"}</li>`)
    $('.dayTwoCard').append(dayTwo, dayTwoTemp,dayTwoIcon, dayTwoHumidity)

    var dayThree = $(`<h5>${threeDaysOut}</h5>`)
    var dayThreeTemp = $(`<li>${"Temp: " + Math.floor(((response.list[23].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayThreeIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[24].weather[0].icon +".png"}></li>`)
    var dayThreeHumidity= $(`<li>${"Humidity: " + response.list[23].main.humidity + "%"}</li>`)
    $('.dayThreeCard').append(dayThree, dayThreeTemp,dayThreeIcon, dayThreeHumidity)

    var dayFour = $(`<h5>${fourDaysOut}</h5>`)
    var dayFourTemp = $(`<li>${"Temp: " + Math.floor(((response.list[31].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFourIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[32].weather[0].icon +".png"}></li>`)
    var dayFourHumidity= $(`<li>${"Humidity: " + response.list[31].main.humidity + "%"}</li>`)
    $('.dayFourCard').append(dayFour, dayFourTemp,dayFourIcon, dayFourHumidity)

    var dayFive = $(`<h5>${fiveDaysOut}</h5>`)
    var dayFiveTemp = $(`<li>${"Temp: " + Math.floor(((response.list[39].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFiveIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[39].weather[0].icon +".png"}></li>`)
    var dayFiveHumidity= $(`<li>${"Humidity: " + response.list[39].main.humidity + "%"}</li>`)
    $('.dayFiveCard').append(dayFive, dayFiveTemp,dayFiveIcon, dayFiveHumidity)
    
})
}
//when searches, pulls that input from search and generates info on the city
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  /*$("#mainWeatherInfo").empty();
  $(".dayOneCard").empty();
  $(".dayTwoCard").empty();
  $(".dayThreeCard").empty();
  $(".dayFourCard").empty();
  $(".dayFiveCard").empty();*/
  var city = $("#search-city").val().trim()
  cities.push(city);
  localStorage.setItem("searched city", city)
  /*var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5feeeec9e5f2ebf79547fc8775da3160";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var tempF= Math.floor(((response.list[0].main.temp)-273.15) * 1.8 + 32)
    var weatherIcon = "http://openweathermap.org/img/w/"+ response.list[0].weather[0].icon +".png"
    console.log(weatherIcon)
    var cityHeader = $(`<h1>${response.city.name +" " + currentDate} <img src=${weatherIcon}></h1>`)
    var temperature = $(`<h3>${"Temperature: " + tempF + "°F"}</h3>`)
    var humidity = $(`<h3>${"Humidity: " + response.list[0].main.humidity + "%"}</h3>`)
    var windSpeed = $(`<h3>${"Wind Speed: " + response.list[0].wind.speed + " MPH"}</h3>`)
    //var uvIndex = $(`<h3>${"UV Index: " + response.list.speed}</h3>`)
    $('#mainWeatherInfo').prepend(cityHeader, temperature, humidity, windSpeed)
    console.log(queryURL)
    console.log(response)
    var dayOne = $(`<h5>${oneDayOut}</h5>`)
    var dayOneTemp = $(`<li>${"Temp: " + Math.floor(((response.list[7].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayOneIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[8].weather[0].icon +".png"}></li>`)
    var dayOneHumidity= $(`<li>${"Humidity: " + response.list[7].main.humidity + "%"}</li>`)
    $('.dayOneCard').append(dayOne, dayOneTemp,dayOneIcon, dayOneHumidity)

    var dayTwo = $(`<h5>${twoDaysOut}</h5>`)
    var dayTwoTemp = $(`<li>${"Temp: " + Math.floor(((response.list[15].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayTwoIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[16].weather[0].icon +".png"}></li>`)
    var dayTwoHumidity= $(`<li>${"Humidity: " + response.list[15].main.humidity + "%"}</li>`)
    $('.dayTwoCard').append(dayTwo, dayTwoTemp,dayTwoIcon, dayTwoHumidity)

    var dayThree = $(`<h5>${threeDaysOut}</h5>`)
    var dayThreeTemp = $(`<li>${"Temp: " + Math.floor(((response.list[23].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayThreeIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[24].weather[0].icon +".png"}></li>`)
    var dayThreeHumidity= $(`<li>${"Humidity: " + response.list[23].main.humidity + "%"}</li>`)
    $('.dayThreeCard').append(dayThree, dayThreeTemp,dayThreeIcon, dayThreeHumidity)

    var dayFour = $(`<h5>${fourDaysOut}</h5>`)
    var dayFourTemp = $(`<li>${"Temp: " + Math.floor(((response.list[31].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFourIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[32].weather[0].icon +".png"}></li>`)
    var dayFourHumidity= $(`<li>${"Humidity: " + response.list[31].main.humidity + "%"}</li>`)
    $('.dayFourCard').append(dayFour, dayFourTemp,dayFourIcon, dayFourHumidity)

    var dayFive = $(`<h5>${fiveDaysOut}</h5>`)
    var dayFiveTemp = $(`<li>${"Temp: " + Math.floor(((response.list[39].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFiveIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[39].weather[0].icon +".png"}></li>`)
    var dayFiveHumidity= $(`<li>${"Humidity: " + response.list[39].main.humidity + "%"}</li>`)
    $('.dayFiveCard').append(dayFive, dayFiveTemp,dayFiveIcon, dayFiveHumidity)*/
  renderSearchHistory();
});
//})
//builds search history
function renderSearchHistory(){
  $("#search-view").empty();
  for(var i=0; i <cities.length; i++){
  var pastSearch = $("<li>");
  pastSearch.addClass("searchedCity list-group-item")
  pastSearch.attr("data-name", cities[i]);
  pastSearch.text(cities[i]);
  $("#search-view").prepend(pastSearch)
  
  //localStorage.setItem("#search-view").val()

  }
  }
//clears previous weather info and pulls up new city
/*function updateWeatherInfo(){
  $("#mainWeatherInfo").empty();
  var city = $(this).attr("data-name")
  console.log= city
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5feeeec9e5f2ebf79547fc8775da3160";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var tempF= Math.floor(((response.list[0].main.temp)-273.15) * 1.8 + 32)
    var weatherIcon = "http://openweathermap.org/img/w/"+ response.list[0].weather[0].icon +".png"
    console.log(weatherIcon)
    var cityHeader = $(`<h1>${response.city.name +" " + currentDate} <img src=${weatherIcon}></h1>`)
    var temperature = $(`<h3>${"Temperature: " + tempF + "°F"}</h3>`)
    var humidity = $(`<h3>${"Humidity: " + response.list[0].main.humidity + "%"}</h3>`)
    var windSpeed = $(`<h3>${"Wind Speed: " + response.list[0].wind.speed + " MPH"}</h3>`)
    //var uvIndex = $(`<h3>${"UV Index: " + response.list.speed}</h3>`)
    $('#mainWeatherInfo').append(cityHeader, temperature, humidity, windSpeed)
    console.log(queryURL)
    console.log(response)
    var dayOne = $(`<h5>${oneDayOut}</h5>`)
    var dayOneTemp = $(`<li>${"Temp: " + Math.floor(((response.list[7].main.temp)-273.15) * 1.8 + 32) + "°F"}</li>`)
    var dayOneIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[8].weather[0].icon +".png"}></li>`)
    var dayOneHumidity= $(`<li>${"Humidity: " + response.list[7].main.humidity + "%"}</li>`)
    $('.dayOneCard').append(dayOne, dayOneTemp,dayOneIcon, dayOneHumidity)

    var dayTwo = $(`<h5>${twoDaysOut}</h5>`)
    var dayTwoTemp = $(`<li>${"Temp: " + Math.floor(((response.list[15].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayTwoIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[16].weather[0].icon +".png"}></li>`)
    var dayTwoHumidity= $(`<li>${"Humidity: " + response.list[15].main.humidity + "%"}</li>`)
    $('.dayTwoCard').append(dayTwo, dayTwoTemp,dayTwoIcon, dayTwoHumidity)

    var dayThree = $(`<h5>${threeDaysOut}</h5>`)
    var dayThreeTemp = $(`<li>${"Temp: " + Math.floor(((response.list[23].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayThreeIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[24].weather[0].icon +".png"}></li>`)
    var dayThreeHumidity= $(`<li>${"Humidity: " + response.list[23].main.humidity + "%"}</li>`)
    $('.dayThreeCard').append(dayThree, dayThreeTemp,dayThreeIcon, dayThreeHumidity)

    var dayFour = $(`<h5>${fourDaysOut}</h5>`)
    var dayFourTemp = $(`<li>${"Temp: " + Math.floor(((response.list[31].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFourIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[32].weather[0].icon +".png"}></li>`)
    var dayFourHumidity= $(`<li>${"Humidity: " + response.list[31].main.humidity + "%"}</li>`)
    $('.dayFourCard').append(dayFour, dayFourTemp,dayFourIcon, dayFourHumidity)

    var dayFive = $(`<h5>${fiveDaysOut}</h5>`)
    var dayFiveTemp = $(`<li>${"Temp: " + Math.floor(((response.list[38].main.temp)-273.15) * 1.8 + 32)+ "°F"}</li>`)
    var dayFiveIcon = $(`<li> <img src=${"http://openweathermap.org/img/w/"+ response.list[39].weather[0].icon +".png"}></li>`)
    var dayFiveHumidity= $(`<li>${"Humidity: " + response.list[38].main.humidity + "%"}</li>`)
    $('.dayFiveCard').append(dayFive, dayFiveTemp,dayFiveIcon, dayFiveHumidity)
})
}*/



//if previous searched city is clicked, pulls up data on that city
$(document).on("click", ".searchedCity", displayWeatherInfo);

renderSearchHistory();
displayWeatherInfo();

