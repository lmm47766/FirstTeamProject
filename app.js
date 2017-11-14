

//********** Ajax call taking first and last name and returning the committe ID ***************//

var firstName = "Judy";
var LastName = "Chu";
$("#hide").hide();
$("#hide2").hide();
$("#hide3").hide();
$("#hide4").hide();
$("#hide5").hide();
$("#hide6").hide();
$("#hide7").hide();
$("#hide8").hide();

$.ajax({
	// url: "https://www.followthemoney.org/metaselect/json/entity.php?t=Candidate&name=trump%2C%20donald&mode=json",
	url: "https://api.open.fec.gov/v1/candidates/search/?sort=name&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&per_page=20&name="
	 	+ firstName+ "%20"+ LastName,
	method: "GET"

}).then(function(data) {

	// console.log(data);
	// console.log(data.results[0].principal_committees[0].committee_id);
	// var committeeId = data.results[0].principal_committees[0].committee_id;
	// console.log(committeeId);
	//********** Ajax call taking the committe ID and returning the top 5 contributers ***************//
	// $.ajax({
	// 	url: "https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&sort_hide_null=true&data_type=processed&committee_id="+
	// 		 committeeId + "&sort=-contribution_receipt_amount&two_year_transaction_period=2016&per_page=100",
	// 	method: "GET"

	// }).done(function(data) {
	// 	// console.log(data);
	// 	var topContributors=[];
	// 	var contributersAmount=[];

	// 	// Deduping the list of contributers
	// 	for (var i = 0; i < data.results.length; i++) {

	// 		if(  topContributors.indexOf(data.results[i].contributor_name) === -1 ){
	// 			topContributors.push(data.results[i].contributor_name);
	// 			contributersAmount.push(data.results[i].contribution_receipt_amount);
	// 			}
	// 	}

	// 	//Listing the top 5 contributers
	// 	for (var i = 0; i < 5; i++) {
	// 		var newDiv = $("<div>");
	// 		$(".test").append(newDiv)
	// 		var a = topContributors[i] + "<br>";
	// 		var b = formatDollar(contributersAmount[i]) + "<br>";
	// 		newDiv.html("<p>" + a + b + "</p>");
	// 	}

	// });

});

//Function that takes integer and formats it in currency format
	function formatDollar(num) {
	    var p = num.toFixed(2).split(".");
	    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
	        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
	    }, "") + "." + p[1];
	}

	$("#run-search").on("click", function(event){

		event.preventDefault();

		$("#hide").show();
		$("#hide2").show();
		$("#hide3").show();
		$("#hide4").show();
		$("#hide5").show();
		$("#hide6").show();
		$("#hide7").show();
		$("#hide8").show();

		$("#national-division-level").show();
		$("#state-division-level").show();
		$("#county-division-level").show();
		$("#local-division-level").show();



		street = $("#street").val();

		//replacing spaces with %20
		newStreet = street.split(" ").join("+");

		city = $("#city-name").val().trim();
		newCity = city.split(" ").join("+");

		state = $("#state").val().trim();
		var apiKey = "AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk";
		var queryURLbase = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey;

		var newURL = queryURLbase + "&address=" + newStreet + "%20" + newCity + "%20" + state;

	$.ajax({
		url: "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk&address=8680+1/2+olympic+blvd.%20Los+ANgeles%20ca",
		method: "GET"
	}).done(function(data) {

		console.log(data);

		// console.log(data.divisions["ocd-division/country:us"].name);
		for (var i = 0; i < data.officials.length; i++) {
			// console.log(data.officials[i].photoUrl);
			var newLi = $("<li>");
			$("#test").append(newLi);

			var newDiv = $("<div>");
			newDiv.addClass("collapsible-header blue-grey-text text-darken-2");
			newLi.append(newDiv);

			var icon = $("<i class='material-icons blue-grey-text text-darken-2'>");
			newDiv.append("<i class='material-icons blue-grey-text text-darken-2'>" + "account_balance" + "</i>");

			var name = data.officials[i].name;

			var newDiv2 = $("<div>");
			newDiv2.addClass("collapsible-body");
			newLi.append(newDiv2);

			var newImg = $("<img>")
			newImg.addClass("circle left z-depth-1");
				if (data.officials[i].photoUrl === undefined ){
					newImg.attr("src", "assets/images/electedOfficials.png");
				}
				else {
					newImg.attr("src",data.officials[i].photoUrl);
				}
			newImg.css("height", "200px");
			newImg.css("width","175px");
			newDiv2.append(newImg);

			console.log(data.officials[i].address[0].line1);

			var newDiv3 = $("<div>");
			newDiv3.addClass("right");

			if (data.officials[i].address[0].line2 === undefined ){
				var addy =  $("<h5 class='right-align blue-grey-text text-darken-2'>");
				addy.append("Address");
				newDiv3.append(addy);
				var line1 = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				line1.append(data.officials[i].address[0].line1);
				newDiv3.append(line1);
				var city = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(data.officials[i].address[0].city);
				newDiv3.append(city);
				var state = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].state);
				newDiv3.append(state);
				var zip = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].zip);
				newDiv3.append(zip);
			}

			else {
				var addy =  $("<h5 class='right-align blue-grey-text text-darken-2'>");
				addy.append("Address");
				newDiv3.append(addy);
				var line1 = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				line1.append(data.officials[i].address[0].line1);
				newDiv3.append(line1);
				var line2 = $("<p class='right-align blue-grey-text text-darken-2'>");
				line2.append(data.officials[i].address[0].line2);
				newDiv3.append(line2);
				var city = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(data.officials[i].address[0].city);
				newDiv3.append(city);
				var state = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].state);
				newDiv3.append(state);
				var zip = $("<p class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].zip);
				newDiv3.append(zip);
			}

			var newDiv4 = $("<div>");
			newDiv4.addClass("clearfix")
			newDiv2.append(newDiv3);
			newDiv2.append(newDiv4);

			for (var j = 0; j < data.offices.length; j++) {

				if (data.offices[j].officialIndices.indexOf(i) > -1) {

					var role = data.offices[j].name;
					var party = data.officials[i].party;
					newLi.attr("id",data.offices[j].divisionId);
				}
			}

			if (party === "Republican") {
				newDiv2.addClass("red lighten-4");
			}

			else if (party === "Democratic") {
				newDiv2.addClass("blue lighten-4");
			}

			else {
				newDiv2.addClass("yellow lighten-4")
			}

			if (data.officials[i].party === undefined) {

			}
			else {
				newDiv4.append("Party: " + party);
			}

			newDiv.append(name + " - " + role);

			if (newLi.attr("id").includes("place")) {
		  	$("#test-local").append(newLi);
		  }

		  else if(newLi.attr("id").includes("county")) {
				$("#test-county").append(newLi);
				console.log(newLi);
		  }

			else if(newLi.attr("id").includes("state")) {
				$("#test-state").append(newLi);
			}

			else if(newLi.attr("id").includes("country")) {
				$("#test").append(newLi);
			}

		}

});

});
