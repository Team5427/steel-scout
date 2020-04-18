var season_id = 0;
$(document).ready(function () {
    var season_id = getSeasonID();
    $.ajax({
        url: '../includes/edit_competitions.php',
        data: { season_id: season_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);

            // $("#season_id").val(result.fn);

        },
        error: function (result) {
            console.log("error");
        }
    });
});

function getSeasonID() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["season_id"];
}



function editComp() {
    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_competitions.php',
        data: { competition_name, compeition_date, season_id, sender: "update" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if (result.success) {
                window.location.assign("manage_competitons.html");
            }
        },
        error: error()
    });
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("edit_competitons.html");
}