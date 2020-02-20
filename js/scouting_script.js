//auto login code
const numInputs = 16;
$(window).on('load', function() {
	let token = getCookie("token");
	// console.log("COOKIE: "+document.cookie);
	// console.log("TOKEN: "+token);
	if(token != null) {
		$.ajax({
			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				//console.log("RESULT: "+result);
				result = JSON.parse(result);
				if(!result['authenticated'] || result['role'] !== 'SCOUTER') 
					window.location.assign("http://localhost/steel-scout-frontend/login.html");
			},
			error: error()
		});
    }
    else{
        window.location.assign("http://localhost/steel-scout-frontend/login.html");
    }
});

// $("#scouting_submit").click(function()
// {
// 	Console.log("clicked");
// 	event.preventDefault();
// 	var error_msg = '';
// 	$("#scouting_error_message").html(error_msg);

// 	for(var i = 1; i<=numInputs; i++)
// 	{
// 		$("#input"+i).css("color", "black");
// 	}

// 	for(var i = 1; i<=numInputs; i++)
// 	{
// 		var input = document.getElementById("#input"+i);
		
// 		if(input.type == "text" && input == '')
// 		{
// 			$("#input"+i).css("color", "#ef2323");
// 			window.scrollTo(0, 0);
// 		}
// 		// if(input.type == "radio" && $("input[name=radio"+i+"]:checked").val().length == 0)
// 		// {
// 		// 	$("#input"+i).css("color", "#ef2323");
// 		// }
// 	}

// });

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
