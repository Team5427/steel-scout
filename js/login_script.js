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

	    $.ajax({
		    url:'http://127.0.0.1:8090/steel-scout-middleend/login.php',
		    data: {email: email, password: password},
		    type: "POST", //or type:"GET" or type:"PUT"
		    success: function (result) {
		    	console.log(result); 
		        if(result=="Incorrect email or password")
		        {
		        	$("#login_error_message_id").html("Incorrect email or password"); 
		        }    
		        else
		        {
		        	if ($('#id_stay_in_cb').is(':checked')) 
		        	{
		        		deleteCookie("reg_auth_token"); 
		        		deleteCookie("persistent_auth_token"); 
		        		setAuthCookiePersistent(email); 
		        	}
		        	else
		        	{
		        		deleteCookie("reg_auth_token"); 
		        		deleteCookie("persistent_auth_token"); 
		        		setAuthCookieAutoExp(email); 
		        	}
		        	window.location.assign("http://localhost:8090/CWI_SITE/index.html");
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
function setAuthCookieAutoExp(email)
{
	$.ajax({
	    url:'http://127.0.0.1:8090/CWI_PHP/set_auth_token.php',
	    data: {email: email},
	    type: "POST", //or type:"GET" or type:"PUT"
	    success: function (result) {
	    	console.log(result); 
			document.cookie = "reg_auth_token=" + result;
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
function setAuthCookiePersistent(email)
{
	$.ajax({
	    url:'http://127.0.0.1:8090/CWI_PHP/set_auth_token.php',
	    data: {email: email},
	    type: "POST", //or type:"GET" or type:"PUT"
	    success: function (result) {
	    	console.log(result); 
	    	var now = new Date();
			now.setTime(now.getTime() + 14 * 24 * 3600 * 1000);
			document.cookie = "persistent_auth_token=" + result + ";expires=" + now.toUTCString();
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
function deleteCookie(cname) 
{
	if(getCookie(cname)!= "")
	{
		document.cookie = cname + "=;" + "expires = Thu, 01 Jan 1970 00:00:00 GMT"; 
		return true; 
	}
	return false; 
}

function getCookie(cname) 
{
	var name = cname + "=";
  	var decodedCookie = decodeURIComponent(document.cookie);
  	var ca = decodedCookie.split(';');
  	for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
  	}
  	return "";
}