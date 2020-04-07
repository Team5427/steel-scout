var email = "";

$(document).ready(function () {
    var team = getTeamFromURL();
    $.ajax({
        url: '../includes/edit_teams.php',
        data: { team: team, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            // $("#newFirstname").val(result.fn);
            $("#newTeamID").val(result.team_id)

        },
        error: error()
    });  
});

function getTeamFromURL() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["email"];
}

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function editTeam() {
    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_teams.php',
        data: {
             team_id: $("#newTeamID").val(), 

        },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if(result.success) {
                window.location.assign("add_teams.html");
            }
        },
        error: error()
    });  
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("manage_teams.html");
}