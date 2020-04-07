$(window).on('load', function(){
	load_forms();
})
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

			result.map(form => {
				var row = document.createElement("tr");
				var team_number = document.createElement("td");
				team_number.innerHTML = form.team_id;
                var del = document.createElement("td");
                var delbutton = document.createElement("input");
					
				delbutton.type = "submit";
				
				var edit = document.createElement("td");
				var editButton = document.createElement("button");
				editButton.type="submit";
				editButton.innerHTML= "Edit";
				editButton.id=  "edit" + form.team_id;
				editButton.onclick = function () {
					event.preventDefault();
					var team_id = document.activeElement.getAttribute('id').substring(4);
					window.location.assign("edit_pitscouting.html?team_id=" + team_id);
				}

				del.appendChild(delbutton);
				edit.appendChild(editButton);
				row.appendChild(team_number);
				row.appendChild(edit);
				row.appendChild(del);
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
