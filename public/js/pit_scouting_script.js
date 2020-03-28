

$("#pit_submit").click(function()
{
	var check = true;
	var numInputs = 9;
	console.log("clicked");
	event.preventDefault();

	$("input:radio").each(function(){
		var name = $(this).attr("name");
		if($("input:radio[name="+name+"]:checked").length == 0)
		{
			check = false;
			console.log(name + "is empty");
			$("#"+name+"id").css("color", "#ef2323");
		}
		else
		{
			$("#"+name+"id").css("color", "black");
		}
	});

	for(var i = 1; i<=numInputs; i++)
	{
		var input = document.getElementById("input"+i);

		if(input.type == "text" || input.type == "number")
		{
			if(input.value == '')
			{
				check = false
			    console.log("input"+i+" is empty");
				input.style.backgroundColor = "#ef2323";
			}
			else
			{
				input.style.backgroundColor = "#f1f1f1"
			}
		}
	}
	console.log(check);
	if(check === false)
	{
		$("#pit_error_message").html("Some fields are incomplete: ");
		window.scrollTo(0, 0);
	}
	else
	{
		window.scrollTo(0,0);
		console.log(typeof(undeclaredVariable));
		$.ajax({
			url: 'http://localhost/steel-scout/includes/pitscouting.php', 
			data: {competition_id: $('[name=competition_id]').val(), team_id: $('[name=team_id]').val(), climb: $('[name=climb]').val(), 
				adjust_level: $('[name=adjust_level]').val(), drive_team_experience: $('[name=drive_team_experience]').val(), inner_port: $('[name=inner_port]').val(), 
				higher_port: $('[name=higher_port]').val(), lower_port: $('[name=lower_port]').val(),defence: $('[name=defence]').val(), autonomousAbilities: $('[name=autonomousAbilities]').val()}, 
			type: "POST",
			success: function(result)
			{
				console.log(result);
				//result = JSON.parse(result);
				console.log(result);
				if(!result === "logged")
					$("#pit_error_message").html(result.error);
				else
				{
					document.getElementById("pitScoutingForm").reset();
					(result['role'] === "SCOUTER") && window.location.assign("http://"+ip+"/steel-scout/pit_scouting_form.html");
				}
			},
			error: function(jqXHR, textStatus, errorThrown, result)
			{
				error(jqXHR, textStatus, errorThrown, result);
			}
		})
	}
});

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
	console.log('jqXHR:');
	console.log(jqXHR);
	console.log('textStatus:');
	console.log(textStatus);
	console.log('errorThrown:');
	console.log(errorThrown);
	console.log('JSON return string: '); 
	console.log(result); 
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}