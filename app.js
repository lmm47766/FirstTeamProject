$.ajax({
	url: "https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot&sort_hide_null=true&data_type=processed&committee_id="+
			"C00580100&sort=-contribution_receipt_amount&two_year_transaction_period=2016&per_page=100",
	method: "GET"
	// beforeSend: function(xhr){
	// xhr.setRequestHeader('X-API-Key', 'Hsx79iOvPRvyHG1tF6GVr91pbhX24N3hcGtkJMot');
	// }
}).then(function(data) {
	console.log(data);
});