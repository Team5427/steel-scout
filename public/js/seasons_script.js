

function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

function addSeason() {
	var season_name = document.getElementById("season_name").value;

	$.ajax({
		url: 'http://localhost/steel-scout/includes/seasons.php',
		data: { season_name },
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			if (result.success)
				window.location.assign("./manage_seasons.html");
			else
				document.getElementById("add_seasons_error").innerHTML = "Failed to add a season: " + result.error;
		},
	});
	return false;
}

function cancel() {
	window.location.assign("./manage_seasons.html");
}
