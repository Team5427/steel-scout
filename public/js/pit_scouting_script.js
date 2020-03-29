window.onload = function() {
	document.getElementById("pit_submit").onclick = function() {

		var teamNumber = document.getElementById("team_number").value;
		var driveTeamExperience = document.getElementById("drive_team_experience").value;
		var autonomousAbilities = document.getElementById("autonomous_abilities").value;

		console.log(autonomousAbilities);
		var canClimb = document.getElementsByName("canClimb");
		var innerPort = document.getElementsByName("innerPort");
		var upperPort = document.getElementsByName("upperPort");
		var lowerPort = document.getElementsByName("lowerPort");
		var defenseBot = document.getElementsByName("defenseBot");

		canClimb = realValue(canClimb);
		innerPort = realValue(innerPort);
		upperPort = realValue(upperPort);
		lowerPort = realValue(lowerPort);
		defenseBot = realValue(defenseBot);

		$.ajax({
			url: "../includes/pitScouting.php",
			data: {teamNumber: teamNumber,canClimb: canClimb, driveTeamExperience: driveTeamExperience, innerPort: innerPort, upperPort: upperPort, lowerPort: lowerPort, defenseBot: defenseBot, autonomousAbilities: autonomousAbilities},
			type: "POST",
			success: function(result) {
				load_forms();
				console.log(result);	
			},
			error: function(result){
				console.log("error");
			}
		});
		return false;
	};
	function realValue(x)
	{
		for (var i = 0; i < x.length; i++) {
			if (x[i].checked) {
				x=x[i].value;
				return x;
			}
		}	
	}
}
