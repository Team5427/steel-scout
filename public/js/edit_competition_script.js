var comp = "";
var seasons;

$(document).ready(function () {
    var competition_id = getIDFromURL();
    $.ajax({
        url: '../includes/edit_competition.php',
        data: { competition_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            result = JSON.parse(result);
            $("#name").val(result.name)
            $("#date").val(result.date)
            $("#season").val(result.seasons.find(x => x.season_id == result.season_id).season_name)
            seasons = result.seasons
        },
        error: error()
    });
});

function getIDFromURL() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["compid"];
}

function error(jqXHR, textStatus, errorThrown, result) {
    console.log("FAILURE");
    $('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function editComp() {
    var competition_name = $('#name').val();
    var competition_date = $('#date').val();
    var season = $('#season').val();
    var season_id = seasons.find(x => x.season_name == season).season_id

    $.ajax({
        url: '../includes/edit_competition.php',
        data: {competition_name, competition_date, season_id, sender: "update", oldID: getIDFromURL() },
        type: "POST",
        success: function (result) {
            result = JSON.parse(result);
            console.log(result)
            if (result.success) {
                window.location.assign("manage_competitions.html");
            }
        },
        error: error()
    });
}

function cancelled() {
    window.location.assign("manage_competitions.html");
}