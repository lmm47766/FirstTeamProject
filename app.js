

//********** Ajax call taking first and last name and returning the committe ID ***************//


$("#hide").hide();
$("#hide2").hide();
$("#hide3").hide();
$("#hide4").hide();
$("#hide5").hide();
$("#hide6").hide();
$("#hide7").hide();
$("#hide8").hide();

var api = [
{c1: "TRUMP MAKE AMERICA GREAT AGAIN CMTE--$121,242,733", c2:"UNITEMIZED DONATIONS--$89,470,214", c3: "TRUMP, DONALD J--$66,141,714"},
{c1: "TRUMP MAKE AMERICA GREAT AGAIN CMTE--$121,242,733", c2:"UNITEMIZED DONATIONS--$89,470,214", c3: "TRUMP, DONALD J--$66,141,714"},
{c1: "UNITEMIZED DONATIONS--$1,392,612", c2:"FEINSTEIN, DIANNE--$124,261", c3: "CA RI MN MD VICTORY FUND--$89,767"},
{c1: "UNITEMIZED DONATIONS--$2,210,714", c2:"KAMALA D HARRIS CAMPAIGN CMTE--$599,439", c3: "CALIFORNIA DEMOCRATIC PARTY--$296,850"},
{c1: "UNITEMIZED DONATIONS--$180,179", c2:"AT&T--$51,770", c3: "CALIFORNIA TEACHERS ASSOCIATION--$40,600"},
{c1: "CALIFORNIA DEMOCRATIC PARTY--$8,746,973", c2:"BALANCE FORWARD--$7,668,900", c3: "UNITEMIZED DONATIONS--$463,436"},
{c1: "UNITEMIZED DONATIONS--$1,068,158", c2:"CALIFORNIA DEMOCRATIC PARTY--$854,393", c3: "CALIFORNIA NURSES ASSOCIATION / NATIONAL NURSES ORGANIZING CMTE--$109,400"},
{c1: "CALIFORNIA TEACHERS ASSOCIATION--$47,600", c2:"CALIFORNIA DENTAL ASSOCIATION--$41,700", c3: "CALIFORNIA STATE ASSOCIATION OF ELECTRICAL WORKERS--$36,700"},
{c1: "", c2:"", c3: ""},
{c1: "", c2:"", c3: ""},
{c1: "", c2:"", c3: ""},
{c1: "LACEY, JACQUELYN--$5,100", c2:"LACEY, JACQUELYN--$4,900", c3: "COOPERATIVE OF AMERICAN PHYSICIANS--$3,000"},
{c1: "", c2:"", c3: ""},
{c1: "", c2:"", c3: ""},
{c1: "", c2:"", c3: ""},
{c1: "", c2:"", c3: ""},
{c1: "CALIFORNIA STATE COUNCIL OF SERVICE EMPLOYEES--$35,800", c2:"CALIFORNIA TEACHERS ASSOCIATION--$32,200", c3: "AT&T--$31,100"},
{c1: "CALIFORNIA DEMOCRATIC PARTY--$114,894", c2:"UNITEMIZED DONATIONS--$86,570", c3: "CALIFORNIA TEACHERS ASSOCIATION--$74,100"},
{c1: "INVESTING IN VICTORY--$72,511", c2:"UNITEMIZED DONATIONS--$57,035", c3: "HONEYWELL INTERNATIONAL--$40,000"},
{c1: "CALIFORNIA DEMOCRATIC PARTY--$64,814", c2:"CALIFORNIA STATE COUNCIL OF LABORERS--$53,000", c3: "UNITEMIZED DONATIONS--$51,476"},
{c1: "AT&T--$71,400", c2:"CALIFORNIA STATE COUNCIL OF LABORERS--$49,500", c3: "SOUTHERN CALIFORNIA PIPE TRADES DISTRICT COUNCIL 16--$49,500"},
{c1: "CALIFORNIA DEMOCRATIC PARTY--$231,941", c2:"CALIFORNIA STATE EMPLOYEES LOCAL 1000--$104,411", c3: "FOOD & COMMERCIAL WORKERS REGION 8 GOLDEN STATE COUNCIL--$94,550"},
{c1: "SENATE MAJORITY FUND--$1,360,369", c2:"CALIFORNIA DEMOCRATIC PARTY--$529,375", c3: "SENATE DEMOCRATIC LEADERSHIP FUND--$507,205"},
{c1: "UNITEMIZED DONATIONS--$123,808", c2:"CALIFORNIA TEAMSTERS JOINT COUNCIL 42--$3,900", c3: "OMELVENY & MEYERS--$2,600"},
{c1: "GALPERIN, RON--$118,547", c2:"UNITEMIZED DONATIONS--$8,482", c3: "CALIFORNIA ASSOCIATION OF REALTORS--$2,600"},
{c1: "CALIFORNIA STATE COUNCIL OF SERVICE EMPLOYEES--$28,900", c2:"CALIFORNIA STATE COUNCIL OF LABORERS--$22,700", c3:"PECHANGA BAND OF LUISENO MISSION INDIANS--$20,700"}
];


function getContributions(name){
	// console.log(name);
	var ctb=[];
	var amt=[];
	var cName = name.split(" ").join("%2C%20");


	var coresUrl = "https://cors-anywhere.herokuapp.com/"
	var idUrl = "https://www.followthemoney.org/metaselect/json/entity.php?t=Candidate&name=" + cName + "&mode=json";
	//var idUrl = "https://www.followthemoney.org/metaselect/json/entity.php?t=Candidate&name=Donald J trump%2C%20&mode=json";
	// console.log(coresUrl + idUrl);
	$.ajax({
		url: coresUrl + idUrl,
		method: "GET"

	}).then(function(data) {

		// console.log(data);
		var jsonData = JSON.parse(data);
		// console.log(jsonData);
		var committeeId = jsonData[0].id;
		// console.log(committeeId);

		 var newP;
		//********** Ajax call taking the committe ID and returning the top 5 contributers ***************//
		$.ajax({
			
			url: "https://api.followthemoney.org/?c-t-eid="+committeeId
			+"&gro=d-eid,d-cci,d-ccb&APIKey=c2a22e874eef3431858439b49fae4aa1&mode=json",
			method: "GET"

		}).done(function(data) {
			var string = "";
			// console.log(data); 

			console.log(name)
			//Listing the top 5 contributers
			for (var i = 0; i < 4; i++) {
					ctb.push(data.records[i].Contributor.Contributor);
					amt.push(formatDollar( parseInt(data.records[i].Total_$.Total_$) ) );
				 // string = string +  data.records[i].Contributor.Contributor + "  " + formatDollar( parseInt(data.records[i].Total_$.Total_$) ) ;
				// $(".container").append(newP)

				console.log(data.records[i].Contributor.Contributor + "  " + formatDollar( parseInt(data.records[i].Total_$.Total_$) )  );

			}
			console.log(" ")
			// finalP = string;
			// return string;


		});
		// return finalP;
		
	});

// return finalP;

}

//Function that takes integer and formats it in currency format





	function formatDollar(num) {
	    var p = num.toFixed(2).split(".");
	    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
	        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
	    }, "") + "." + p[1];
	}

	$("#run-search").on("click", function(event){
		$(".collapsible").empty();
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


		$("#street").val("");
		$("#city-name").val("");
		$("#state").val("");

		
		var apiKey = "AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk";
		var queryURLbase = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey;

		var newURL = queryURLbase + "&address=" + newStreet + "%20" + newCity + "%20" + state;

	$.ajax({
		url: newURL,
		method: "GET"
	}).done(function(data) {
			var name=[];
		// console.log(data);
		for (var i = 0; i < data.officials.length; i++) {
			name.push(data.officials[i].name);
		}
		console.log(name);

		// console.log(data.divisions["ocd-division/country:us"].name);
		for (var i = 0; i < data.officials.length; i++) {
			// console.log(data.officials[i].photoUrl);
			var newLi = $("<li>");
			//$("#test").append(newLi);

			var newDiv = $("<div class='collapsible-header blue-grey-text text-darken-2'>");
			newLi.append(newDiv);

			var icon = $("<i class='material-icons'>");
			//newDiv.append("<i class='material-icons blue-grey-text text-darken-2'>" + "account_balance" + "</i>");
			var name = data.officials[i].name;
			console.log(name);
			var a =getContributions(name);
			console.log(a);

			var newDiv2 = $("<div class='collapsible-body'>");
			newLi.append(newDiv2);

			var newDiv0 = $("<div class='col s1' id='wrapper-div'>");

            newIm1 = $("<a target='blank' href><img height='60px' class='fb clearfix' id='fb" + i + "'></a>");
            newIm2 = $("<a target='blank' href><img height='60px' class='tw clearfix' id='tw" + i + "'></a>");
            newIm3 = $("<a target='blank' href><img height='60px' class='yt clearfix' id='yt" + i + "'></a>");
            $(".fb").attr("src", "assets/images/fb.png");
            $(".tw").attr("src", "assets/images/tw.png");
            $(".yt").attr("src", "assets/images/yt_360.png");
            newDiv0.append(newIm1);
            newDiv0.append(newIm2);
            newDiv0.append(newIm3);
			newDiv2.append(newDiv0);

            if(data.officials[i] && data.officials[i].hasOwnProperty("channels")) {
                // console.log("official ", data.officials[i])
                for (var x = 0; x < data.officials[i].channels.length; x++) {
                    // console.log("channels ", data.officials[i].channels[x])
                    if (data.officials[i].channels[x].type === "Facebook") {
                        // console.log("type ", data.officials[i].channels[x].type)
                        $("#fb"+i).parent().attr("href", "https://" + data.officials[i].channels[x].type + ".com/" + data.officials[i].channels[x].id);
                    }
                    if (data.officials[i].channels[x].type === "Twitter") {
                        // console.log("type ", data.officials[i].channels[x].type)
                        $("#tw"+i).parent().attr("href", "https://" + data.officials[i].channels[x].type + ".com/" + data.officials[i].channels[x].id);
                    }
                    if (data.officials[i].channels[x].type === "YouTube") {
                        // console.log("type ", data.officials[i].channels[x].type)
                        $("#yt"+i).parent().attr("href", "https://" + data.officials[i].channels[x].type + ".com/" + data.officials[i].channels[x].id);
                    }

                }

            }


			var imgDiv = $("<div class='col s3' id='wrapper-div2'>");
			var newImg = $("<img class='circle left z-depth-2'>")
			newImg.attr("src",data.officials[i].photoUrl);
			newImg.css("height", "200px");
			newImg.css("width","200px");
			imgDiv.append(newImg);
			newDiv2.append(imgDiv);






			if (data.officials[i].channels === undefined){
				newImg.attr("src", "assets/images/electedOfficials.png");
			}

			else {
				for (var x = 0; x < data.officials[i].channels.length; x++){
					//console.log(data.officials[9].channels[x].type);
					if (data.officials[i].channels[x].type === "Facebook") {
						//console.log(i + data.officials[i].channels[x].id);
						var fbImg = ("https://graph.facebook.com/" + data.officials[i].channels[x].id + "/picture?type=large&w%E2%80%8C%E2%80%8Bidth=720&height=720");
						//console.log(fbImg);
						if (data.officials[i].photoUrl === undefined ){
							newImg.attr("src", fbImg);
						}
					}

					else if (data.officials[i].channels[x].type === "Twitter") {
						//console.log(i + data.officials[i].channels[x].id);
						var twImg = ("https://twitter.com/" + data.officials[i].channels[x].id + "/profile_image?size=original");
						//console.log(twImg);
						if (data.officials[i].channels[x].type !== "Facebook" ){
							newImg.attr("src", twImg);
						}
					}

					else if (data.officials[i].channels[x].type === undefined) {
						newImg.attr("src", "assets/images/electedOfficials.png");
					}
				}
			}


			var newDiv3 = $("<div class='right col s3' id='wrapper-div3'>");
			var addyDiv = $("<div>");


			if (data.officials[i].address[0].line2 === undefined ){
				var addy =  $("<h5 class='right-align blue-grey-text text-darken-2'>");
				addy.append("Address");
				addyDiv.append(addy);
				var line1 = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				line1.append(data.officials[i].address[0].line1);
				addyDiv.append(line1);
				var city = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(data.officials[i].address[0].city);
				addyDiv.append(city);
				var state = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].state);
				addyDiv.append(state);
				var zip = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].zip);
				addyDiv.append(zip);
				var phone = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				phone.append("Phone: " + data.officials[i].phones);
				addyDiv.append(phone);
			}

			else {
				var addy =  $("<h5 class='right-align blue-grey-text text-darken-2'>");
				addy.append("Address");
				addyDiv.append(addy);
				var line1 = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				line1.append(data.officials[i].address[0].line1);
				addyDiv.append(line1);
				var line2 = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				line2.append(data.officials[i].address[0].line2);
				addyDiv.append(line2);
				var city = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(data.officials[i].address[0].city);
				addyDiv.append(city);
				var state = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].state);
				addyDiv.append(state);
				var zip = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				city.append(" " + data.officials[i].address[0].zip);
				addyDiv.append(zip);
				var phone = $("<h6 class='right-align blue-grey-text text-darken-2'>");
				phone.append("Phone: " + data.officials[i].phones);
				addyDiv.append(phone);
			}

			newDiv3.append(addyDiv);


			newDiv2.append(newDiv3);


			var dataDiv = $("<div class='left col s5'>");
			dataDiv.css("padding-left", "30px");

			for (var j = 0; j < data.offices.length; j++) {

				if (data.offices[j].officialIndices.indexOf(i) > -1) {

					var role = data.offices[j].name;
					var party = data.officials[i].party;
					newLi.attr("id",data.offices[j].divisionId);
					// console.log(data.offices[j].divisionId);
				}
			}

			if (party === "Republican") {
				newDiv2.addClass("red lighten-5");
				newDiv.append("<i class='material-icons red-text text-darken-3'>" + "account_balance" + "</i>");

			}

			else if (party === "Democratic") {
				newDiv2.addClass("blue lighten-5");
				newDiv.append("<i class='material-icons blue-text text-darken-3'>" + "account_balance" + "</i>");

			}

			else {
				newDiv2.addClass("yellow lighten-5")
				newDiv.append("<i class='material-icons yellow-text text-darken-5'>" + "account_balance" + "</i>");

			}

			if (data.officials[i].party === undefined) {

			}
			else {

				dataDiv.append("<h5>Party: " + party + "</h>");
				newDiv2.append(dataDiv);
				dataDiv.append("<h5>Top 3 Contributors</h5>");
				var newO = $("<ol>");
				dataDiv.append(newO);
				newO.css("padding-left","15px");
				newO.append("<li>"+api[i].c1+"</li>");
				newO.append("<li>"+api[i].c2+"</li>");
				newO.append("<li>"+api[i].c3+"</li>");
			}

			newDiv.append(name + " - " + role);
			newDivC = $("<div class='clearfix row'>");
			newDiv2.append(newDivC);


			if (newLi.attr("id").includes("place")) {
		  	$("#test-local").append(newLi);
		  }

		  else if(newLi.attr("id").includes("county")) {
				$("#test-county").append(newLi);
		  }

			// else if(newLi.attr("id").includes("cd:")) {
			// 	$("#test-county").append(newLi);
		 //  }

			else if(newLi.attr("id").includes("state")) {
				$("#test-state").append(newLi);
			}

			// else if(newLi.attr("id").includes("country")) {
			// 	$("#test").append(newLi);
			// }
			else if(newLi.attr("id").includes("country")) {
				$("#test").append(newLi);
			}
		}

});

});
