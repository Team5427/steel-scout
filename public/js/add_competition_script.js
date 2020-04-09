function addComp() {
    event.preventDefault();
    var name = $("#name").val()
    var date = $("#date").val()
    var season = $("#season").val()

    $.ajax({
		url:'../includes/add_competition.php',
		data: {name: name, date: date, season: season},
		type: "POST",
		success: function (result) {
			console.log(result);
		},
		error: error()
	});

    return false;
}

function error() {
	alert("Yikes")
}