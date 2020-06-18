
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function addComp(){
    var name = document.getElementById("name").value;
	var date = document.getElementById("date").value;
	 var season = document.getElementById("season").value;
    $.ajax({
        url:'http://localhost/steel-scout/includes/add_competition.php',
        data: {name, date},
        type: "POST", //or type:"GET" or type:"PUT"
        success: function (result) {
			console.log("alsdjfl")
            result = JSON.parse(result);
			if(result.success)
                window.location.assign("./manage_competitions.html");
            else
                document.getElementById("add_competition_error").innerHTML = "Failed to add a competition: "+result.error;
        },
        // error: error(error)
    });
    return false;
}

function cancel(){
    window.location.assign("./manage_competitions.html");
}
