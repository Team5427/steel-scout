window.onload = function() {
	document.getElementById("pit_submit").onclick = function() 
	{

		$.ajax({
			url: "../includes/pitScouting.php",
			data: 
			{
				team: $('[name=team]').val(),
//				canClimb: canClimb, 
//				driveTeamExperience: driveTeamExperience, 
//				innerPort: innerPort, 
//				upperPort: upperPort, 
//				lowerPort: lowerPort, 
//				defenseBot: defenseBot, 
//				autonomousAbilities: autonomousAbilities
			},
			type: "POST",
			success: function(result) {
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
