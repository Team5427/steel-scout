$(window).on('load', function () {
	loadSeasons();
})

function loadSeasons() {
	$.ajax({
		url:'../includes/add_competition.php',
		data: {sender: "loading"},
		type: "POST",
		success: function (result) {
			result = JSON.parse(result);
			console.log(result);

			$.each(result.seasons, function( index, value ) {
				var x = value.season_name;
				$("#seasons").append("<option id=\""+ value.season_id +"\" value=\""+ value.season_name + "\"/>");
			});
		},
		error: function(xhr, status, error) {
			var err = eval("(" + xhr.responseText + ")");
			alert(err.Message);
		}
	});
}


function addComp() {
    event.preventDefault();
    var name = $("#name").val()
    var date = $("#date").val()
    var season = $("#season").val()
	var season_id = $("#seasons option[value='" + season + "']").attr('id');
    $.ajax({
		url:'../includes/add_competition.php',
		data: {name, date, season_id, sender: "adding"},
		type: "POST",
		success: function (result) {
			result = JSON.parse(result);
			console.log(result);
			window.location.assign("manage_competitions.html")
		},
		error: function(xhr, status, error) {
			var err = eval("(" + xhr.responseText + ")");
			alert(err.Message);
		}
	});
    return false;
}

function error() {
	alert("Error!");
}

function cancelled() {
	window.location.assign("manage_competitions.html");
}