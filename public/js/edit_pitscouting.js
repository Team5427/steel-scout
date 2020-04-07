var team_id = "null";
$(document).ready(function () {
    team_id = getTeamIDFromURL();
    $.ajax({
        url: '../includes/edit_pit_scouting.php',
        data: { team_id: team_id, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            console.log(result.drive_team_exp);

            $("#edit_team_id").val(result.team_id);
            $('input:radio[name=canClimb]')[0].checked = result.canClimb==1?true:false;         
            $('input:radio[name=canClimb]')[1].checked = result.canClimb == 0? true : false;    
            $("#edit_drive_team_experience").val(result.drive_team_exp);
            $('input:radio[name=inner]')[0].checked = result.inner == 1 ? true:false;
            $('input:radio[name=inner]')[1].checked = result.inner == 0 ? true:false;
            $('input:radio[name=higher]')[0].checked = result.higher == 1 ? true : false;
            $('input:radio[name=higher]')[1].checked = result.higher == 0 ? true : false;      
            $('input:radio[name=lower]')[0].checked = result.lower == 1 ? true : false;
            $('input:radio[name=lower]')[1].checked = result.lower == 0 ? true : false;      
            $('input:radio[name=defense]')[0].checked = result.defense == 1 ? true : false;
            $('input:radio[name=defense]')[1].checked = result.defense == 0 ? true : false;      
            $("#edit_auto").val(result.auto);
        },
        error: function(result) {
            console.log("error");
        }
    });
});

function getTeamIDFromURL(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["team_id"];
}

function edit_pitscouting_form() {
    $.ajax({
        url: '../includes/edit_pit_scouting.php',
        data: {
            team_id: $("#edit_team_id").val(),
            canClimb: $('input:radio[name=canClimb]')[0].checked ? 1 : 0,
            avgdexp: $("#edit_drive_team_experience").val(),
            inner:  $('input:radio[name=inner]')[0].checked ? 1 : 0,
            lower:  $('input:radio[name=lower]')[0].checked ? 1 : 0,
            upper:  $('input:radio[name=higher]')[0].checked ? 1 : 0,
            defense: $('input:radio[name=defense]')[0].checked ? 1: 0,
            auton: $('#edit_auto').val(),
            oldID: team_id,
            sender: "update" 
        },
        type: "POST",
        success: function (result) {
            result = JSON.parse(result);
            if (result.success) {
                window.location.assign("pit_scouting_manage.html");
            }
        },
        error: function(result) {
            alert("yikes!" + JSON.stringify(result))
            console.log(result)
        }
    });
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("pit_scouting_manage.html");
}