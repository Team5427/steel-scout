function deleteUser(){
	$.ajax({
		url:'http://localhost/steel-scout/includes/changeUsers.php',
		data: {username: username, password: password, admin: admin, append: false},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			console.log(result);
			load_users();
		},
		error: error()
	});
}