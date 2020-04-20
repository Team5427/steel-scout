$("#scouting_submit").click(function()
{
	var check = true;
	var numInputs = 1;
	console.log("clicked");
	event.preventDefault();
	window.scrollTo(0,0);
	$.ajax({
            url: 'http://localhost/steel-scout/includes/new_scouting.php', 
	    data:{
                team: $('[name=team]').val(), 
                competition: $('[name=competition').val(), 
                scouter: $('[name=scouter]').val()
            }, 
            type: "POST", 
            success: function(result)
            {
		if(!result === "logged")
                    $("#scouting_error_message").html(result.error);
		else
		{
		    document.getElementById("scoutingForm").reset();

//		    (result['role'] === "SCOUTER") && window.location.assign("http://"+ip+"/steel-scout-frontend/scouting.html");
		}
				
	    }, 
	    error: function(jqXHR, textStatus, errorThrown, result)
	    {
                console.log("not sent");
                error(jqXHR, textStatus, errorThrown, result);
	    }
        });
    }
);

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
