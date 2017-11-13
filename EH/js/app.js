

//********** Ajax call taking first and last name and returning the committe ID ***************//

var firstName = "Judy";
var LastName = "Chu";

$.ajax({
	// url: "https://api.open.fec.gov/v1/candidates/search/?name=Mike%20Pence&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&sort=name&per_page=20",
	url: "https://api.open.fec.gov/v1/candidates/search/?sort=name&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&per_page=20&name="
		+ firstName+ "%20"+ LastName,
	method: "GET"

}).done(function(data) {
	console.log(data);
	// console.log(data.results[0].principal_committees[0].committee_id);
	var committeeId = data.results[0].principal_committees[0].committee_id;

	//********** Ajax call taking the committe ID and returning the top 5 contributers ***************//
	$.ajax({
		url: "https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&sort_hide_null=true&data_type=processed&committee_id="+
			 committeeId + "&sort=-contribution_receipt_amount&two_year_transaction_period=2016&per_page=100",
		method: "GET"

	}).done(function(data) {
		// console.log(data);
		var topContributors=[];
		var contributersAmount=[];

		// Deduping the list of contributers
		for (var i = 0; i < data.results.length; i++) {

			if(  topContributors.indexOf(data.results[i].contributor_name) === -1 ){
				topContributors.push(data.results[i].contributor_name);
				contributersAmount.push(data.results[i].contribution_receipt_amount);
				}
		}

		//Listing the top 5 contributers
		for (var i = 0; i < 5; i++) {
			var newDiv = $("<div>");
			$(".test").append(newDiv)
			var a = topContributors[i] + "<br>";
			var b = formatDollar(contributersAmount[i]) + "<br>";
			newDiv.html("<p>" + a + b + "</p>");
		}

		console.log(topContributors);
		console.log(contributersAmount);
	});


});







// $.ajax({
// url: "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk&address=8680%20Olympic%20blvd%20losangele%20ca",
// 	method: "GET"
//
// }).done(function(data) {
// ;
//
//
// 	for (var i = 0; i < data.officials.length; i++) {
//
// 		var newLi = $("<li>");
// 		$("#test").append(newLi);
//
// 		var newDiv = $("<div>");
// 		newDiv.addClass("collapsible-header blue-grey-text text-darken-2");
// 		newLi.append(newDiv);
//
// 		var icon = $("<i class='material-icons blue-grey-text text-darken-2'>");
// 		newDiv.append("<i class='material-icons blue-grey-text text-darken-2'>" + "account_balance" + "</i>");
//
// 		var name = data.officials[i].name;
// 		// console.log(data.officials[i].name + " " + i);
//
// 		var newDiv2 = $("<div>");
// 		newDiv2.addClass("collapsible-body");
// 		newLi.append(newDiv2);
//
// 		var newImg = $("<img>")
// 		newImg.addClass("circle left z-depth-1");
// 		// var test = data.officials[i].channels
// 		newImg.attr("src",data.officials[i].photoUrl);
// 		newImg.css("height", "200px");
// 		newImg.css("width","175px");
// 		newDiv2.append(newImg);
//
// 		var newDiv3 = $("<div>");
// 		newDiv3.addClass("clearfix");
// 		newDiv2.append(newDiv3);
//
//
// 		for (var j = 0; j < data.offices.length; j++) {
//
//
// 			if (  data.offices[j].officialIndices.indexOf(i) > -1   ) {
//
// 				var role = data.offices[j].name;
// 				var party = data.officials[i].party;
//
// 			}
//
// 		}
//
// 		newDiv2.append(party);
// 		newDiv.append(name + " - " + role);
//
// 	}
//
//
//
// });
//
//


//Function that takes integer and formats it in currency format
function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}



$("#run-search").on("click", function(event){

	event.preventDefault();
	$("#well-section").empty();

	streetNumber = $("#street-number").val().trim();
	streetName = $("#street-name").val().trim();
	streetType = $("#street-type").val().trim();
	city = $("#city-name").val().trim();
	state = $("#state").val().trim();

	var apiKey = "AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk";
	var queryURLbase = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey;
	var newURL = queryURLbase + "&address=" + streetNumber + "%20" + streetName + "%20" + streetType + "%20" + city + "%20" + state;
	console.log(newURL);

	return false;


	$.ajax({
		 url: "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk&address=8680%20olympic%20blvd.%20la%20ca",
		//url: newURL,
		method: "GET"

	}).done(function(data) {
	;

		console.log(data);
		for (var i = 0; i < data.officials.length; i++) {

			var newLi = $("<li>");
			$("#test").append(newLi);

			var newDiv = $("<div>");
			newDiv.addClass("collapsible-header blue-grey-text text-darken-2");
			newLi.append(newDiv);

			var icon = $("<i class='material-icons blue-grey-text text-darken-2'>");
			newDiv.append("<i class='material-icons blue-grey-text text-darken-2'>" + "account_balance" + "</i>");

			var name = data.officials[i].name;
			// console.log(data.officials[i].name + " " + i);

			var newDiv2 = $("<div>");
			newDiv2.addClass("collapsible-body");
			newLi.append(newDiv2);

			var newImg = $("<img>")
			newImg.addClass("circle left z-depth-1");
			// var test = data.officials[i].channels
			newImg.attr("src",data.officials[i].photoUrl);
			newImg.css("height", "200px");
			newImg.css("width","175px");
			newDiv2.append(newImg);

			var newDiv3 = $("<div>");
			newDiv3.addClass("clearfix");
			newDiv2.append(newDiv3);


			for (var j = 0; j < data.offices.length; j++) {


				if (  data.offices[j].officialIndices.indexOf(i) > -1   ) {

					var role = data.offices[j].name;
					var party = data.officials[i].party;

				}

			}

			newDiv2.append(party);
			newDiv.append(name + " - " + role);

		}



	});






});
