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

//below header Lists Cities city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

//UV index is color coded for favorable, moderate or severe



//5 day forecast: displays date, icon representation of weather conditions, the temperature, and the humidity
api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

 var fiveDayForecastURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey

 var city = Rocklin
 
 var apiKey = "&appid=5feeeec9e5f2ebf79547fc8775da3160"

 console.log(fiveDayForecaseURL)
 var date
 var icon= list.weather.icon
 var temperature = list.main.temp
 var humidity = list.main.humidity




/* movie ajax example
function movieSearch(movie){
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
var row = $("<tr>")
var title = $("<td>"+ response.Title +"</td>")
var year = $("<td>"+ response.Year +"</td>")
var actors = $("<td>"+ response.Actors +"</td>")
row.append(title,year, actors)
$('tbody').append(row)
})
  }

//can create Arrays to make even faster
movies.forEach(function(movie){
movieSearch(movie)
})*/

//saves previous in local storage for user to come back to find previous searches



