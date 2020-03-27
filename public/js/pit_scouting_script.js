

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
		var undeclaredVariable = $('input[type=radio][name=radio6]').val();
		console.log(typeof(undeclaredVariable));
		$.ajax({
			url: 'http://localhost/steel-scout-frontend/php/pitScouting.php', 
			data: {teamNumber: $('[name=teamNumber]').val(), radio1: $('input[type=radio][name=radio1]:checked').val(), radio2: $('input[type=radio][name=radio2]:checked').val(), 
				driveTeamExperience: $('[name=driveTeamExperience]').val(), radio3: $('input[type=radio][name=radio3]:checked').val(), radio4: $('input[type=radio][name=radio4]:checked').val(), 
				radio5: $('input[type=radio][name=radio5]:checked').val(), radio6: $('input[type=radio][name=radio6]:checked').val(), autonomousAbilities: $('[name=autonomousAbilities]').val()}, 
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
					(result['role'] === "SCOUTER") && window.location.assign("http://"+ip+"/steel-scout-frontend/scouting.html");
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