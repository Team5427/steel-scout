//$(window).on('load', function() {
//	let token = getCookie("token");
//	// console.log("COOKIE: "+document.cookie);
//	// console.log("TOKEN: "+token);
//	if(token != null) {
//		$.ajax({
//			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
//			data: {token: token},
//			type: "POST", //or type:"GET" or type:"PUT"
//			success: function (result) {
//				//console.log("RESULT: "+result);
//				result = JSON.parse(result);
//				if(!result['authenticated'] || result['role'] !== 'SCOUTER') 
//					window.location.assign("http://localhost/steel-scout-frontend/login.html");
//			},
//			error: error()
//		});
//    }
//    else{
//        window.location.assign("http://localhost/steel-scout-frontend/login.html");
//    }
//});

// $("#pit_submit").click(function()
// {
// 	var check = true;
// 	var numInputs = 9;
// 	console.log("clicked");
// 	event.preventDefault();

// 	console.log(check);
	
	
// 	window.scrollTo(0,0);
// 	var undeclaredVariable = $('input[type=radio][name=radio6]').val();
// 	console.log(typeof(undeclaredVariable));
// 	$.ajax({
// 		url: 'http://localhost/steel-scout-frontend/php/pitScouting.php', 
// 		data: {teamNumber: $('[name=teamNumber]').val(), radio1: $('input[type=radio][name=radio1]:checked').val(), radio2: $('input[type=radio][name=radio2]:checked').val(), 
// 			driveTeamExperience: $('[name=driveTeamExperience]').val(), radio3: $('input[type=radio][name=radio3]:checked').val(), radio4: $('input[type=radio][name=radio4]:checked').val(), 
// 			radio5: $('input[type=radio][name=radio5]:checked').val(), radio6: $('input[type=radio][name=radio6]:checked').val(), autonomousAbilities: $('[name=autonomousAbilities]').val()}, 
// 		type: "POST", 
// 		success: function(result)
// 		{
// 			console.log(result);
// 			//result = JSON.parse(result);
// 			console.log(result);
// 			if(!result === "logged")
// 				$("#pit_error_message").html(result.error);
// 			else
// 			{
// 				document.getElementById("pitScoutingForm").reset();
// 				(result['role'] === "SCOUTER") && window.location.assign("http://"+ip+"/steel-scout-frontend/scouting.html");
// 			}
				
// 		}, 
// 		error: function(jqXHR, textStatus, errorThrown, result)
// 		{
// 			error(jqXHR, textStatus, errorThrown, result);
// 		}
// 		})
	
// });

// function error(jqXHR, textStatus, errorThrown, result) {
// 	console.log("FAILURE");
// 	alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

// 	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
// 	console.log('jqXHR:');
// 	console.log(jqXHR);
// 	console.log('textStatus:');
// 	console.log(textStatus);
// 	console.log('errorThrown:');
// 	console.log(errorThrown);
// 	console.log('JSON return string: '); 
// 	console.log(result); 
// }

// function getCookie(name) {
//     var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//     return v ? v[2] : null;
// }


// $("pit_submit").click(function() {
// 	console.log("a;slkdf");
// 	$.ajax({
// 		type: "POST",
// 		url: "http://localhost/steel-scout-frontend/php/pitScouting.php",
// 		data: {
// 			teamNumber: $("#teamNumber").val(),
// 			access_token: $("#teamNumber").val()
// 		},
// 		success: function(results){
// 			alert("ok");
// 		},
// 		error: function(result){
// 			alert('error');
// 		}
// 	});
// });
window.onload = function() {
	document.getElementById("pit_submit").onclick = function() {
		console.log(document.getElementById("input1").value);

		var teamNumber = document.getElementById("input1").value;

		$.ajax({
			url: "../includes/pitScouting.php",
			data: {teamNumber: teamNumber},
			type: "POST",
			success: function(result) {
				console.log(result);
			},
			error: function(result){
				console.log("error");
			}
		});
		return false;
	};
}
