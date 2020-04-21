$(window).on('load', function(){
	load_forms();
})

function addPitScouting() {
	window.location.assign("pit_scouting_form.html");
}


function load_forms(){
	$.ajax({
		url:'http://localhost/steel-scout/includes/loadPitScoutingForms.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			table = document.getElementById("pitFormsTable");
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(form => 
				{
				var row = document.createElement("tr");

				var team_number = document.createElement("td");
				team_number.innerHTML = form.team_number;	

				var team_id = document.createElement("td");
				team_id.innerHTML = form.team_id;
				// team_number.innerHTML = form.team_id;

				var pit_scouting_id = document.createElement("td");
				pit_scouting_id.innerHTML = form.pit_scouting_id;

                var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.className = "delete btn";
				delbutton.value = "Delete";
				// delbutton.onclick = function () {
					var conf = confirm("Are you sure you want to delete:\nTeam Number:"+form.team_id+"\nClimb:"+form.climb+"\nAdjust Level:"+form.adjust_level+"\nDrive Team Experience:"+form.drive_team_experience+"\nInner Port:"+form.inner_port+"\nHigher Port:"+form.higher_port+"\nLower Port:"+form.lower_port+"\nDefense:"+form.defense+"\nAutonomous Abilities:"+form.autonomous_abilities+"\n");
				// 	if(conf==true)
				// 	{
				// 	event.preventDefault();
				// 	$.ajax({
				// 		url: '../includes/remove_pit_scouting.php',
				// 		data: { team_number: form.team_id, pit_scouting_id:form.pit_scouting_id },
				// 		type: "POST", //or type:"GET" or type:"PUT"
				// 		success: function (result) {
				// 			console.log(result);
				// 			load_forms();
				// 		},
				// 		error: error()
				// 	});
				// }
				// }
				// delbutton.type = "submit";


				delbutton.onclick = function () {
					event.preventDefault();
					this.blur(); // Manually remove focus from clicked link.
					$.get(this.href, function (html) {
						$('#modal').modal();
						// $('#modal').data("team_id", form.team_id, "pit_scouting_id", form.pit_scouting_id);
						$('#modal').data("team_id", form.team_id);
						$('#m_info').html("Are you sure you want to delete: \nTeam Number: "+form.team_id+"\nClimb: "+form.climb+"\nAdjust Level: "+form.adjust_level+"\nDrive Team Experience: "+form.drive_team_experience+"\nInner Port: "+form.inner_port+"\nHigher Port: "+form.higher_port+"\nLower Port: "+form.lower_port+"\nDefense: "+form.defense+"\nAutonomous Abilities: "+form.autonomous_abilities+"\n");
					});
				}
				delbutton.type = "submit";

				
                del.appendChild(delbutton);
                row.appendChild(team_number);
				row.appendChild(del);
				table.appendChild(row);
			})
		},
		error: error()
	});
}


$(document).ready(function (e) {
	$('#submit').on('click', function () {
		var teamid = $('#modal').data('team_id')
		$.ajax({
			url: '../includes/remove_pit_scouting.php',
			data: { teamid: teamid },
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log(result);
				load_forms();
			},
			error: error()
		});
		$('#modal').removeData("team_id");
	});
});



function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}
