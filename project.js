
// id = "weather-request" is attached to the form
// Louisa is at         "location": {
//          "lat": 38.0643297,
//          "lng": -82.6267345

var google = "https://maps.googleapis.com/maps/api/geocode/json?"+"&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";//lacking address in middle

var louisa /*darkSky */ ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/38.0634,-82.6267";//lacking Lat,Lng at the end.

function round(num){
  return Math.floor(num + 0.5);
}
function toPercent(num){
  if(!num){
    return 0;
  }
  return Math.floor((num*100)+0.5);
}

$(function(){

//function getWeather(url=louisa){
  $.ajax(louisa, {dataType: "jsonp"}).done(function(data){
    $("#today-currentTemp").html(round(data.currently.temperature));
    $("#today-summary").html(data.currently.summary);
    $("#today-minTemp").html(round(data.daily.data[0].temperatureMin));
    $("#today-maxTemp").html(round(data.daily.data[0].temperatureMax));
    $("#today-chanceRain").html(toPercent(data.daily.data[0].precipProbability));


    $("button").click(function(){
//      e.preventDefault();
      request = "https://maps.googleapis.com/maps/api/geocode/json?address="+ $("#zipcode").val() +"&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
      $.ajax(request, {dataType: "json"}).done(function(loca){
        var lat=(loca.results[0].geometry.location.lat);
        console.log(lat);
        var lng=(loca.results[0].geometry.location.lng);
        console.log(lng);
        $(".location").html(loca.results[0].address_components[1].long_name);
        $(".location").append(" , "+loca.results[0].address_components[2].short_name);

        var newLocation = "https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/" + lat +"," + lng;
        console.log(newLocation);
          $.ajax(newLocation, {dataType: "jsonp"}).done(function(data){
            $("#today-currentTemp").html(round(data.currently.temperature));
            $("#today-summary").html(data.currently.summary);
            $("#today-minTemp").html(round(data.daily.data[0].temperatureMin));
            $("#today-maxTemp").html(round(data.daily.data[0].temperatureMax));
            $("#today-chanceRain").html(toPercent(data.daily.data[0].precipProbability));
          });

      });//end googleapis
    });//end submit


  // $.ajax(url, {method: "GET"}).done(function(data){
  //   $("#me").append(data.name +" likes "+data.drink);
  
  
  
    // console.log(data);
    // for (i=1; i <= data.length; i++){
    //   $(".API-target").append("<li>"+data[i].name+"</li>");
    // }
  });//end ajax
});//end function