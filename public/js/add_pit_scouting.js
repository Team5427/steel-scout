window.onload = function() {
	document.getElementById("pit_submit").onclick = function() 
	{

		$.ajax({
			url: "../includes/add_pit_scouting.php",
			data: 
			{
				team: $('[name=team]').val(),
				scouter: $('[name=scouter]').val(), 
				competition: $('[name=competition]').val(),
				climb: $('input[type=radio][name=climb]:checked').val(),
				adjust_level: $('input[type=radio][name=adjust_level]:checked').val(), 
				drive_team_experience: $('[name=drive_team_experience]').val(),
				inner_port: $('input[type=radio][name=inner_port]:checked').val(),
				higher_port: $('input[type=radio][name=higher_port]:checked').val(),
				lower_port: $('input[type=radio][name=lower_port]:checked').val(),
				defense: $('input[type=radio][name=defense]:checked').val(), 
				autonomous_abilities: $('[name=autonomous_abilities]').val()
			},
			type: "POST",
			success: function(result) 
			{
				console.log(result);	
				if(!result === "logged")
				{
					console.log(result.error);
				}
				else
				{
					document.getElementById("pitScoutingForm").reset();
				}
			},
			error: function(result)
			{
				console.log("error");
			}
		});
		return false;
	};
}
