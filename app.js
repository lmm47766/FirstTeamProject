

//********** Ajax call taking first and last name and returning the committe ID ***************//

var firstName = "Donald";
var LastName = "Trump";

$.ajax({
	// url: "https://api.open.fec.gov/v1/candidates/search/?name=Mike%20Pence&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&sort=name&per_page=20",
	url: "https://api.open.fec.gov/v1/candidates/search/?sort=name&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&per_page=20&name=" 
		+ firstName+ "%20"+ LastName,
	method: "GET"

}).done(function(data) {
	// console.log(data.results[0].principal_committees[0].committee_id);
	var committeeId = data.results[0].principal_committees[0].committee_id;

	//********** Ajax call taking the committe ID and returning the top 5 contributers ***************//
	$.ajax({
		url: "https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&sort_hide_null=true&data_type=processed&committee_id="+
			 committeeId + "&sort=-contribution_receipt_amount&two_year_transaction_period=2016&per_page=100",
		method: "GET"

	}).done(function(data) {

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
	

	});


});







$.ajax({
	url: "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk&address=1657%20Rodeo%20rd%20arcadia%20ca",
	method: "GET"

}).done(function(data) {
;


	for (var i = 0; i < data.officials.length; i++) {

		var newDiv = $("<div>");
		$(".test2").append(newDiv);

		var name = data.officials[i].name + "<br>";
		// console.log(data.officials[i].name + " " + i);


			for (var j = 0; j < data.offices.length; j++) {
				
				if (  data.offices[j].officialIndices.indexOf(i) > -1   ) {

					var role = data.offices[j].name + "<br>";
					var party = data.officials[i].party + "<br>";


				}

			}
		newDiv.append("<p>" +name + role + party + "</p>");

	}



});











//Function that takes integer and formats it in currency format
function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}




