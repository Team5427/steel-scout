var email = "";

$(document).ready(function () {
    var email = getEmailFromURL();

    $.ajax({
        url: '../includes/changeUsers.php',
        data: { email: email, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);

            $("#newFirstname").val(result.fn);
            $("#newLastname").val(result.ln);
            $("#newEmail").val(result.un);
            $("#newPass").val(result.pw);
            $("#newRole").val(result.op);

        },
        error: error()
    });


    
});

function getEmailFromURL() {
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