// Variable Declaration

var gFront = "https://maps.googleapis.com/maps/api/geocode/json?";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";

var louisa ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/38.0634,-82.6267";

var newLocation ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/89.5,0";//probably should be empty at definition

var loca = {
  results : [
    {
      address_components : [
        [], { long_name : "Louisa" }, { shortt_name : "KY"}
      ]
    }
  ]
};

// -------------------------------------------------
$(function(){
  
  cardBuilder(loca, louisa);

  $("button").click(function(){
    request = "https://maps.googleapis.com/maps/api/geocode/json?address="+ $("#zipcode").val() +"&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
    $.ajax(request, {dataType: "json"}).done(function(loca){
      
      var lat=(loca.results[0].geometry.location.lat);
      var lng=(loca.results[0].geometry.location.lng);

      newLocation = "https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/" + lat +"," + lng;
      
      cardBuilder(loca, newLocation);

    });//end googleapis
  });//end buttonclick
});//end function
//--------------------------
// Function declarations

var cardBuilder = function(loca, url){
  var html = "";
  var wrapperA = "<div class='container wrapper'><div class='row padded'>";
  var wrapperB = "</div> </div>";
  var cardA = "<div class='col-sm-4'><div class='well card'><h3 class = 'card-title'><span class='dayOfWeek'>";
  var cardB = "</span><br /><span id = 'date'>";
  var cardC = "</span></h3>";
  var cardD = "<h1><span id='currentTemp'>";
  var cardE = "</span>&#8457;</h1>";
  var cardF = "<br /><p><span id = 'summary' class='card-text'>";
  var cardG = "</span></p><hr /><table class = 'table'><tr><td>MIN</td><td>MAX</td><td>Chance of Rain</td></tr><tr><td><span id='minTemp'>";
  var cardH = "</span>&#8457;</td><td><span id='maxTemp'>";
  var cardI = "</span>&#8457;</td><td><span id='chanceRain'>";
  var cardJ = "</span>%</td></tr></table><hr /></div></div>";
  var build = $("#putItInMe");
  $.ajax( url, {dataType: "jsonp"} ).done(function(data){
  $(".location").html(loca.results[0].address_components[1].long_name);
  $(".location").append(" , "+loca.results[0].address_components[2].short_name);
  for (var a = 0; a <=5; a++) {
    if (a == 0) {
      html=(wrapperA);
    }
    if (a == 3) {
      html+=(wrapperB);
      html+=(wrapperA);
    }
    html+=(cardA);
    html+=("SOME-DAY"); // new stuff, not implemented
    html+=(cardB);
   html+=("MM/DD/YYYY"); // new stuff, not implemented
    html+=(cardC);
    if(a == 0){
      html+=(cardD);
      html+=(round(data.currently.temperature));
      html+=(cardE);
    }
    html+=(cardF);
    html+=(data.currently.summary);
    html+=(cardG);
    html+=(round(data.daily.data[a].temperatureMin));
    html+=(cardH);
    html+=(round(data.daily.data[a].temperatureMax));
    html+=(cardI);
    html+=(toPercent(data.daily.data[a].precipProbability));
    html+=(cardJ);
    if (a == 5) {
      html+=(wrapperB);
    }
    build.html(html);
  }
  });
}

function round(num){
  return Math.round(num);
}

function toPercent(num){
  if(!num) { return 0; }
  return Math.round((num*100));
}
