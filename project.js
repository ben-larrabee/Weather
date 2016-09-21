
// id = "weather-request" is attached to the form


var google = "https://maps.googleapis.com/maps/api/geocode/json?"+"&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";//lacking address in middle

var darkSky ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/";//lacking Lat,Lng at the end.

$(function(){

  $.ajax(google, {method: "GET"}).done(function(data){
    $("location").append(data."blah");
  })

  $.ajax(url, {method: "GET"}).done(function(data){
    $("#me").append(data.name +" likes "+data.drink);
  
  
  
    // console.log(data);
    // for (i=1; i <= data.length; i++){
    //   $(".API-target").append("<li>"+data[i].name+"</li>");
    // }
  });//end ajax
});//end function