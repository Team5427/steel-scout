
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function addTeam(){
	var team_number = document.getElementById("newTeamNumber").value;
	var team_name = document.getElementById("newTeamName").value;

	$.ajax({
		url:'http://localhost/steel-scout/includes/new_teams.php',
		data: {team_number,team_name},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			
			result = JSON.parse(result);
			console.log(team_number);
			console.log(team_name);

			if(result.success)
				window.location.assign("./manage_teams.html");
			else
				document.getElementById("add_team_error").innerHTML = "Failed to add a team: "+result.error;
		},
		// error: error(error)
	});
	return false;
}

function cancel(){
	window.location.assign("./manage_teams.html");
}

