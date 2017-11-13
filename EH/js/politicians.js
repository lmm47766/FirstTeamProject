
var apiKey = "AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk";
    var streetName = "";
    var streetNumber = "";
    var stRdOrAve = "";
    var city = "";
    var state = "";

var queryURLbase = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey;

function runAddress(numOfficials, queryURL) {

  $.ajax({url: queryURL,
   method: "GET"}).done(function(OfficialsData){

    for (var i = 0; i < OfficialsData.officials.length; i++) {

        var wellsection = $("<div>");
        wellsection.addClass("well");
        wellsection.attr("id", "official-well" + i);

      $("#well-section").append(wellsection);
      $("#official-well" + i).append("<img src='" + OfficialsData.officials[i].photoUrl + "'width='100'>");
      $("#official-well" + i).append("<h2>" + OfficialsData.officials[i].name + "</h2");
      $("#official-well" + i).append("<h3>" + OfficialsData.officials[i].party + "</h3");
      if(OfficialsData.officials[i] && OfficialsData.officials[i].hasOwnProperty("urls")){
      $("#official-well" + i).append("<h3> <a href='" + OfficialsData.officials[i].urls[0] + "' target='_blank'>" + OfficialsData.officials[i].urls[0] + "</a></h3");
      }
    }
  })
}

$("#run-search").on("click", function(){

event.preventDefault();
politicians = 0;
$("#well-section").empty();

  street = $("#street").val().trim();
  city = $("#city-name").val().trim();
  state = $("#state").val().trim();
  console.log(street, city, state);

  var newURL = queryURLbase + "&address=" + street + "%20" + city + "%20" + state;
  console.log(newURL);
  runAddress(1, newURL);
  return false;
})
$("#clear-all").on("click", function() {

  $("#well-section").empty();
});
