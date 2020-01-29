//auto login code
const ip = "localhost";
$(window).on('load', function() {
	let token = getCookie("token");
	console.log("COOKIE: "+document.cookie);
	console.log("TOKEN: "+token);
	if(token != null) {
		$.ajax({
			url:'http://'+ip+'/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log("RESULT: "+result);
				result = JSON.parse(result);
				if(!result['authenticated'] || result['role'] !== 'SCOUTER') 
					window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
			},
			error: error()
		});
    }
    else{
        window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
    }
});

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	// alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
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