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

function load_users(){
	$.ajax({
		url:'http://localhost/steel-scout/includes/loadUsers.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			table = document.getElementById("usertable");
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(user => {
				var row = document.createElement("tr");
				var username = document.createElement("td");
				username.innerHTML = user.username;
				var pass = document.createElement("td");
				pass.innerHTML = user.password;
				var admin = document.createElement("td");
				admin.innerHTML = user.admin == 1? "ADMIN": "NON-ADMIN";
				var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.value = "DELETE";
				delbutton.onclick = function(){
					$.ajax({
						url:'http://localhost/steel-scout/includes/deleteUsers.php',
						data: {scouter_id:user.scouter_id},
						type: "POST", //or type:"GET" or type:"PUT"
						success: function (result) {
							console.log(result);
							load_users();
						},
						error: error()
					});
				}
				delbutton.type = "submit";
				del.appendChild(delbutton);
				row.appendChild(username);
				row.appendChild(pass);
				row.appendChild(admin);
				row.appendChild(del);
				table.appendChild(row);
			})

		},
		error: error()
	});
}

function addUser(){
	var username = document.getElementById("newUsername").value;
	var password = document.getElementById("newPass").value;
	var admin = document.getElementById("newRole").value;

	$.ajax({
		url:'http://localhost/steel-scout/includes/changeUsers.php',
		data: {username: username, password: password, admin: admin},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			console.log(result);
			load_users();
		},
		error: error()
	});
	return false;
}

function deleteUser(id){
	
		$.ajax({
			url:'http://localhost/steel-scout/includes/deleteUsers.php',
			data: {scouter_id:id},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log(result);
				load_users();
			},
			error: error()
		});
	
}