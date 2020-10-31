/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast*/

//Form created on side of Website for Searching Cities
//Stores previous searches in a search history below search bar
//previous cities at buttons that link back to their dashbaord

//once Searched Posts City and Date in Header
//initial cities in search bar
var cities = ['Los Angeles', 'New York', 'San Francisco', 'Chicago'];

$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var city = $("#search-city").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5feeeec9e5f2ebf79547fc8775da3160";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var cityHeader = $(`<h1>${response.city.name + " " + response.list[0].dt_txt}</h1>`)
    var temperature = $(`<h3>${"Temperature: " + response.list[0].main.temp}</h3>`)
    var humidity = $(`<h3>${"Humidity: " + response.list[0].main.humidity}</h3>`)
    var windSpeed = $(`<h3>${"Wind Speed: " + response.list[0].wind.speed}</h3>`)
    var uvIndex = $(`<h3>${"UV Index: " + response.list[0].weather.icon}</h3>`)
    $('#mainWeatherInfo').append(cityHeader, temperature, humidity, windSpeed, uvIndex)
    console.log(queryURL)
    console.log(response)
})

});




