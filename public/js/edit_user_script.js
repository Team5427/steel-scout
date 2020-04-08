var email = "";

$(document).ready(function () {
    var email = getEmailFromURL();
    $.ajax({
        url: '../includes/edit_user.php',
        data: { email: email, sender: "getold" },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);

            $("#newFirstname").val(result.fn);
            $("#newLastname").val(result.ln);
            $("#newEmail").val(result.em);
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

function editUser() {
    console.log("Confirmed!")
    $.ajax({
        url: '../includes/edit_user.php',
        data: {
            firstname: $("#newFirstname").val(),
            lastname: $("#newLastname").val(),
            email: $("#newEmail").val(),
            password: $("#newPass").val(),
            admin: $("#newRole").val(),
            sender: "update" 
        },
        type: "POST",
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            if(result.success) {
                window.location.assign("users.html");
            }
        },
        error: error()
    });  
}

function cancelled() {
    console.log("Cancelled!")
    window.location.assign("users.html");
}
