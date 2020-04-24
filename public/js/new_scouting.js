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
                scouter: $('[name=scouter]').val(),
                match: $('[name=match]').val(),          
                auto_line: $('[name=auto_line]').val(),
                auto_high: $('[name=auto_high_target]').val(),
                auto_low: $('[name=auto_low_target]').val(),
                auto_collect: $('[name=auto_collect_balls]').val(),           
                stage1_high: $('[name=high_target1]').val(),
                stage1_low: $('[name=low_target1]').val(),
                stage1_complete: $('[name=stage1_completed]').val(),               
                stage2_high: $('[name=high_target2]').val(),
                stage2_low: $('[name=low_target2]').val(),
                rotation_control: $('[name=rotation_control]').val(),
                stage3_high: $('[name=high_target3]').val(),
                stage3_low: $('[name=low_target3]').val(),
                position_control: $('[name=position_control]').val(),
                stage3_complete: $('[name=stage3_completed]').val()
                
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
