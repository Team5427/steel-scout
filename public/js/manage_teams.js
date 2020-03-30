$(window).on('load', function(){
	load_users();
})

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
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

