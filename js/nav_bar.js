//auto login code
$(window).on('load', function() {
	authenticate();
});

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	// alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

	//$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


function load_navbar(role){
	navbar = document.getElementById("topnav");
	var inside = document.createElement("div");
	
	//adding home bar to all

	if(role === "COACH"){
		var upcomingMatches = document.createElement("a");
		upcomingMatches.href = "#";
		upcomingMatches.innerHTML = "UPCOMING MATCHES";
		inside.appendChild(upcomingMatches);
	}
	if(role === "SCOUTER"){
		var pitscout = document.createElement("a");
		pitscout.href = "./pit_scouting_form.html";
		pitscout.innerHTML = "PIT SCOUT";
		inside.appendChild(pitscout);
		var scout = document.createElement("a");
		scout.href = "./scouting.html";
		scout.innerHTML = "SCOUT";
		inside.appendChild(scout);
	}
	if(role === "LEAD"){
		var allusers = document.createElement("a");
		var allmatches = document.createElement("a");
		var teamrankings = document.createElement("a");

		allusers.href = "./users.html";
		allusers.innerHTML = "All Users";

		allmatches.href = "#";
		allmatches.innerHTML = "All Matches";
		
		teamrankings.innerHTML = "Team Rankings";
		teamrankings.href = "./rankings.html";

		inside.appendChild(allusers);
		inside.appendChild(allmatches);
		inside.appendChild(teamrankings);
	}
	if(role === "REP"){
		var topteams = document.createElement("a");
		var teamrankings = document.createElement("a");

		topteams.href = "#";
		topteams.innerHTML = "Top Teams";

		teamrankings.href = "#";
		teamrankings.innerHTML = "Team Rankings";


		inside.appendChild(topteams);
		inside.appendChild(teamrankings);
	}

	var logout = document.createElement("a");
	logout.innerHTML = "LOGOUT";
	logout.onclick = function(){
		document.cookie  = "token=0";
		authenticate();
	}

	inside.appendChild(logout);
	navbar.appendChild(inside);
}

function authenticate(){
	let token = getCookie("token");
    var authenticated;
    var role;
	if(token != null) {
		$.ajax({
			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log("RESULT: "+result);
				result = JSON.parse(result);
                authenticated = result['authenticated'];
				role = result['role'];
				load_navbar(role);
				if(!result['authenticated'])
					window.location.assign("http://localhost/steel-scout-frontend/login.html")   
			},
			error: function(){
				error();
			}
		});
    }else{
		authenticated = false;
		load_navbar(role);
    }
}