$(window).on('load', function(){
	load_users();
})

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}


function load_users(){
	$.ajax({
		url:'../includes/manage_teams.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			table = document.getElementById("usertable");
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(team => {
				var row = document.createElement("tr");
				var team_id = document.createElement("td");
				team_id.innerHTML = team.team_id;
				var team_number = document.createElement("td");
				team_number.innerHTML = team.team_number;
				var edit = document.createElement("td");
				var editbutton = document.createElement("input");
				editbutton.value = "edit"
				editbutton.type = "submit";
				editbutton.onclick = function(){
					window.location.assign('edit_teams.html');
				}
				var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.value = "delete"
				delbutton.type = "submit";
				del.appendChild(delbutton);
				edit.appendChild(editbutton);
				row.appendChild(team_id);
				row.appendChild(team_number);
				row.appendChild(edit);
				row.appendChild(del);
				table.appendChild(row);
			})

		},
		error: error()
	});
}

