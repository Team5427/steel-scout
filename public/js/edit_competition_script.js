var comp = "";

$(document).ready(function () {
    var team_id = getIDFromURL();
    console.log(competition_id);
    $.ajax({
        url: '../includes/edit_competitions.php',
        data: { competition_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            $("#name").val(result.name)
            $("#name").val(result.date)
            $("#name").val(result.season)


        },
        error: error()
    });
});

function getIDFromURL() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["competition_id"];
}

function error(jqXHR, textStatus, errorThrown, result) {
    console.log("FAILURE");
    $('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function editTeam() {
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var season = document.getElementById("season").value;


    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_competitions.php',
        data: { name,date,season, sender: "update", oldID: getIDFromURL() },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if (result.success) {
                window.location.assign("manage_competitions.html");
            }
        },
        error: error()
    });
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("manage_competitions.html");
}