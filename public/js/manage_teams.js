$(window).on('load', function(){
	load_teams();
})

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}


function load_teams(){
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
				var team_number = document.createElement("td");
				team_number.innerHTML = team.team_number;
				var edit = document.createElement("td");
				var editbutton = document.createElement("input");
				editbutton.value = "edit";
				editbutton.type = "submit";
				editbutton.onclick = function(){
					event.preventDefault();
					var team_id = team.team_id;
					window.location.assign("edit_teams.html?team_id="+team_id);
				}
				var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.value = "delete";
				delbutton.type = "submit";
				
				delbutton.onclick = function () {
					event.preventDefault();
					this.blur(); 
					$.get(this.href, function (html) {
						$('#modal').modal();
						$('#modal').data("team_id", team.team_id);
						$('#m_info').html("The FRC team: <b>" + team.team_number +'</b>')
					});
				}
				delbutton.type = "submit";

				del.appendChild(delbutton);
				edit.appendChild(editbutton);
				row.appendChild(team_number);
				row.appendChild(edit);
				row.appendChild(del);
				table.appendChild(row);
			})

		},
		error: error()
	});
}

function addNewTeam(){
	window.location.assign('./add_teams.html')
}

$(document).ready(function (e) {
	$('#submit').on('click', function () {
		var team = $('#modal').data('team')
		$.ajax({
			url: '../includes/delete_teams.php',
			data: { team: team },
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log(result);
				load_teams();
			},
			error: error()
		});
		$('#modal').removeData("team");
	});
});