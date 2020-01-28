const ip = "localhost";
$("#login_submit_button_id").click(function(){ 
	event.preventDefault();
	var error_msg = ''; 
	$("#login_error_message_id").html(error_msg); 

	//reset the color of all the inputs in case there was an error
	$("#login_email_label_id").css('color', 'black');
	$("#login_password_label_id").css('color', 'black');

	//check for errors
	if($("#login_email_input_id").val()=='' || $("#login_password_input_id").val()=='' )
	{
		error_msg = 'The following mandatory fields are incomplete: '; 

		if($("#login_email_input_id").val()=='')
		{
			error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;Email '; 
			$("#login_email_label_id").css('color', '#ef2323');
		}
		if($("#login_password_input_id").val()=='')
		{
			error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;Password '; 
			$("#login_password_label_id").css('color', '#ef2323');
		}
		$("#login_error_message_id").html(error_msg); 
		window.scrollTo(0, 0);
	}
	else
	{
		var email = $("#login_email_input_id").val(); 
		var password = $("#login_password_input_id").val();
		//console.log("EMAIL: "+email);
	    $.ajax({
		    url:'http://'+ip+'/steel-scout-frontend/php/login.php',
		    data: {email: email, password: password},
		    type: "POST", //or type:"GET" or type:"PUT"
		    success: function (result) {
				console.log(result);
				result = JSON.parse(result);
				console.log(result); 
				console.log(result['authenticated']);
		        if(!result['authenticated'])
		        {

		        	$("#login_error_message_id").html(result.error); 
		        }    
		        else
		        {
					document.cookie = "token="+result.token;
		        	window.location.assign("http://localhost/steel-scout-frontend/scouting.html");
		        }
		    },
		    error: function(jqXHR, textStatus, errorThrown, result) {
	                alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

	                $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
	                console.log('jqXHR:');
	                console.log(jqXHR);
	                console.log('textStatus:');
	                console.log(textStatus);
	                console.log('errorThrown:');
	                console.log(errorThrown);
	                console.log('JSON return string: '); 
	                console.log(result); 
	            },
		});
	}
});