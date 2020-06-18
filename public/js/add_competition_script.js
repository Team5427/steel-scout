$("#scouting_clear").click(function () {
    document.getElementById("scoutingForm").reset();
    console.log("cleared");

});

window.onload = function () {
    document.getElementById("pit_submit").onclick = function () {

        var name = document.getElementById("name").value;
        var date = document.getElementById("date").value;
        // var season = document.getElementById("season").value;

        console.log(name);
        console.log(date);


        $.ajax({
            url: "../includes/pitScouting.php",
            data: { name,date},
            type: "POST",
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                console.log("error");
            }
        });
        return false;
    };
}


function error(jqXHR, textStatus, errorThrown, result) {
    console.log("FAILURE");
    alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

    $('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('errorThrown:');
    console.log(errorThrown);
    console.log('JSON return string: ');
    console.log(result);
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
function cancelled() {
    window.location.assign("manage_competitions.html");
} 