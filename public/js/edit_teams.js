var team = "";

$(document).ready(function () {
    var team_id = getIDFromURL();
    console.log(team_id);
    $.ajax({
        url: '../includes/edit_teams.php',
        data: { team_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            $("#editTeamNumber").val(result.teamnum)

        },
        error: error()
    });  
});

function getIDFromURL() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["team_id"];
}

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function editTeam() {
    var team_number = document.getElementById("editTeamNumber").value;
    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_teams.php',
        data: {team_number, sender: "update", oldID: getIDFromURL()},
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if(result.success) {
                window.location.assign("manage_teams.html");
            }
        },
        error: error()
    });  
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("manage_teams.html");
}