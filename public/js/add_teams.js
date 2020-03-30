//$(window).on('load', function() {
//	let token = getCookie("token");
//	if(token != null) {
//		$.ajax({
//			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
//			data: {token: token},
//			type: "POST", //or type:"GET" or type:"PUT"
//			success: function (result) {
//				result = JSON.parse(result);
//				if(!result['authenticated'] || result['role'] !== 'LEAD') {
//					window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
//				}
//				load_users();
//			},
//			error: error()
//		});
//    }
//    else{
//        window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
//    }
//});

$(window).on('load', function(){
	load_users();
})

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function addUser(){
	var username = document.getElementById("newUsername").value;
	var password = document.getElementById("newPass").value;
	var admin = document.getElementById("newRole").value;

	$.ajax({
		url:'http://localhost/steel-scout/includes/changeUsers.php',
		data: {username: username, password: password, admin: admin, append: true},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			console.log(result);
			load_users();
		},
		error: error()
	});
	return false;
}

