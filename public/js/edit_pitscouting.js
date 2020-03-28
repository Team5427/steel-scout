//check if lines 2-19 are correct and are working
var team_id =  0;
$(document).ready(function () {
    // i don't understand if im supposed to do
    var team_id = getTeamIDFromURL();
    $.ajax({
        url: '../includes/edit_pit_scouting_form.php',
        data: { team_id: team_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);

            $("#teamid").val(result.fn);
           
        },
        error: error()
    });
});

function getTeamIDFromURL(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["team_id"];
}



function editUser() {
    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_pitscouting_form.php',
        data: {
            firstname: $("#teamid").val(),
            sender: "update"
        },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if (result.success) {
                window.location.assign("pit_scouting_form.html");
            }
        },
        error: error()
    });
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("pit_scouting_form.html");
}