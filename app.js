

//********** Ajax call taking first and last name and returning the committe ID ***************//

var firstName = "Donald";
var LastName = "Trump";

$.ajax({
	url: "https://api.open.fec.gov/v1/candidates/search/?sort=name&api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&page=1&per_page=20&name=" + firstName+ "%20"+ LastName,
	method: "GET"

}).then(function(data) {
;

	var committeeId = data.results[0].principal_committees[0].committee_id;

	//********** Ajax call taking the committe ID and returning the top 5 contributers ***************//
	$.ajax({
		url: "https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&sort_hide_null=true&data_type=processed&committee_id="+
			 committeeId + "&sort=-contribution_receipt_amount&two_year_transaction_period=2016&per_page=100",
		method: "GET"

	}).then(function(data) {


		for (var i = 0; i < 5; i++) {
			var newDiv = $("<div>");
			$(".info_here").append(newDiv)
			var a = data.results[i].contributor_name + "<br>";
			var b = formatDollar(data.results[i].contribution_receipt_amount) + "<br>";
			newDiv.append("<p>" + a + b + "</p>");
		}

	});


});



//Function that takes integer and formats it in currency format
function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}






// https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk&address=1657%20Rodeo%20rd%20arcadia%20ca


