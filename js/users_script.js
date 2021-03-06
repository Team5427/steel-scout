$(window).on('load', function() {
	let token = getCookie("token");
	if(token != null) {
		$.ajax({
			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				result = JSON.parse(result);
				if(!result['authenticated'] || result['role'] !== 'LEAD') {
					window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
				}
				load_users();
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
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function load_users(){
	$.ajax({
		url:'http://localhost/steel-scout-frontend/php/loadUsers.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			table = document.getElementById("usertable");
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(user => {
				var row = document.createElement("tr");
				var email = document.createElement("td");
				email.innerHTML = user.email;
				var pass = document.createElement("td");
				pass.innerHTML = user.password;
				var role = document.createElement("td");
				role.innerHTML = user.role;
				var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.type = "submit";
				del.appendChild(delbutton);
				row.appendChild(email);
				row.appendChild(pass);
				row.appendChild(role);
				row.appendChild(del);
				table.appendChild(row);
			})

		},
		error: error()
	});
}

function addUser(){
	var email = document.getElementById("newEmail").value;
	var password = document.getElementById("newPass").value;
	var role = document.getElementById("newRole").value;

	$.ajax({
		url:'http://localhost/steel-scout-frontend/php/changeUsers.php',
		data: {email: email, password: password, role: role, append: true},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			console.log(result);
			load_users();
		},
		error: error()
	});
	return false;
}

function deleteUser(){
	$.ajax({
		url:'http://localhost/steel-scout-frontend/php/changeUsers.php',
		data: {email: email, password: password, role: role, append: false},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			console.log(result);
			load_users();
		},
		error: error()
	});
}