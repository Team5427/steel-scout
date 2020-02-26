var ip = "localhost";
$("#login_submit_button_id").click(function(){ 
	event.preventDefault();
	var error_msg = ''; 
	$("#login_error_message_id").html(error_msg); 

	//reset the color of all the inputs in case there was an error
	$("#login_email_label_id").css('color', 'black');
	$("#login_password_label_id").css('color', 'black');

	//check for errors
	if($("#login_email_input_id").val()=='' || $("#login_password_input_id").val()=='' ){
		error_msg = 'Some fields are incomplete: '; 
		if($("#login_email_input_id").val()=='')
			$("#login_email_label_id").css('color', '#ef2323');
		if($("#login_password_input_id").val()=='')
			$("#login_password_label_id").css('color', '#ef2323');
		$("#login_error_message_id").html(error_msg); 
		window.scrollTo(0, 0);
	}
	else{
		//console.log("A");
		var email = $("#login_email_input_id").val(); 
		var password = $("#login_password_input_id").val();
	    $.ajax({
		    url:'http://'+ip+'/steel-scout-frontend/php/login.php',
		    data: {email: email, password: password},
		    type: "POST", //or type:"GET" or type:"PUT"
		    success: function (result) {
				console.log(result);
				result = JSON.parse(result);
				console.log(result);
		        if(!result['authenticated'])
		        	$("#login_error_message_id").html(result.error);   
		        else{
					
					document.cookie = "token="+result.token;

					//set default pages
					(result['role'] === "SCOUTER") && window.location.assign("http://"+ip+"/steel-scout-frontend/scouting.html");
					(result['role'] === "LEAD") && window.location.assign("http://"+ip+"/steel-scout-frontend/users.html");
					

		        }
		    },
		    error: function(jqXHR, textStatus, errorThrown, result){
				error(jqXHR, textStatus, errorThrown, result);
			}
		});
	}
});

//auto login code
$(window).on('load', function() {
	let token = getCookie("token");
	console.log("COOKIE: "+document.cookie);
	console.log("TOKEN: "+token);
	if(token != null) {
		console.log("B")
		$.ajax({
			url:'http://'+ip+'/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log("RESULT: "+result);
				result = JSON.parse(result);
				if(result['authenticated']) 
				{
					console.log("A");
					//set default pages
					(result['role'] === "SCOUTER") &&  window.location.assign("http://"+ip+"/steel-scout-frontend/scouting.html");
					(result['role'] === "LEAD") && window.location.assign("http://"+ip+"/steel-scout-frontend/users.html");
				}
			},
			error: error()
		});
	}
});

function error() {
	console.log("FAILURE");
	// alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

	// $('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
	// console.log('jqXHR:');
	// console.log(jqXHR);
	// console.log('textStatus:');
	// console.log(textStatus);
	// console.log('errorThrown:');
	// console.log(errorThrown);
	// console.log('JSON return string: '); 
	// console.log(result); 
}
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}