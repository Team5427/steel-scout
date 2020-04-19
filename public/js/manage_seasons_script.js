$(window).on('load', function(){
	load_forms();
})
function load_forms(){
	$.ajax({
		url:'../includes/loadSeasonsForms.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			table = document.getElementById("pitSeasonsTable");
			
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(form => 
				{
				var row = document.createElement("tr");
				var season_years = document.createElement("td");
				season_years.innerHTML = form.season_id;

                /*var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.className = "delete btn";
				delbutton.value = "Delete";
				delbutton.onclick = function () {
					var conf = confirm("Are you sure you want to delete:\nTeam Number:"+form.team_id+"\nClimb:"+form.climb+"\nAdjust Level:"+form.adjust_level+"\nDrive Team Experience:"+form.drive_team_experience+"\nInner Port:"+form.inner_port+"\nHigher Port:"+form.higher_port+"\nLower Port:"+form.lower_port+"\nDefense:"+form.defense+"\nAutonomous Abilities:"+form.autonomous_abilities+"\n");
					if(conf==true)
					{
					event.preventDefault();
					$.ajax({
						url: '../includes/remove_pit_scouting.php',
						data: { team_number: form.team_id, pit_scouting_id:form.pit_scouting_id },
						type: "POST", //or type:"GET" or type:"PUT"
						success: function (result) {
							console.log(result);
							load_forms();
						},
						error: error()
					});
				}
				}
				
				delbutton.type = "submit";*/

                //del.appendChild(delbutton);
                row.appendChild(season_years);
				//row.appendChild(del);
				table.appendChild(row);
			})
		},
		error: error()
	});
}
function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}