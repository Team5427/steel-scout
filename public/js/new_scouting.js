$("#scouting_clear").click(function()
{
	document.getElementById("scoutingForm").reset();
	console.log("cleared");

});

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
                auto_line: $('input[type=radio][name=auto_line]:checked').val(),
                auto_high: $('[name=auto_high_target]').val(),
                auto_low: $('[name=auto_low_target]').val(),
                auto_collect: $('[name=auto_collect_balls]').val(),           
                stage1_high: $('[name=high_target1]').val(),
                stage1_low: $('[name=low_target1]').val(),
                stage1_complete: $('input[type=radio][name=stage1_completed]:checked').val(),               
                stage2_high: $('[name=high_target2]').val(),
                stage2_low: $('[name=low_target2]').val(),
                rotation_control: $('input[type=radio][name=rotation_control]:checked').val(),
                stage3_high: $('[name=high_target3]').val(),
                stage3_low: $('[name=low_target3]').val(),
                position_control: $('input[type=radio][name=position_control]:checked').val(),
                stage3_complete: $('input[type=radio][name=stage3_completed]:checked').val(),
                ended_status: $('[name=end_status]').val(),
                is_level : $('input[type=radio][name=level]:checked').val(),
                final_RP : $('[name=finalRP]').val(),
                is_defense : $('input[type=radio][name=defenseBot]:checked').val(),
                inner_port : $('input[type=radio][name=innerPort]:checked').val()
                


                
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
