//$(window).on('load', function() {
//	let token = getCookie("token");
//	if(token != null) {
//		$.ajax({
//			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
//			data: {token: token},
//			type: "POST", //or type:"GET" or type:"PUT"
//			success: function (result) {
//				result = JSON.parse(result);
//				if(!result['authenticated'] || result['role'] !== 'LEAD') {
//					window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
//				}
//				load_users();
//			},
//			error: error()
//		});
//    }
//    else{
//        window.location.assign("http://"+ip+"/steel-scout-frontend/login.html");
//    }
//});

$(window).on('load', function () {
	load_competitions();
})

function error(jqXHR, textStatus, errorThrown, result) {
	console.log("FAILURE");
	$('#result').html('<p>status code: </p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div></div>');
}

function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

function load_competitions() {
	$.ajax({
		url: '../includes/manage_competition.php',
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			result = JSON.parse(result);
			console.log(result);
			table = document.getElementById("comptable");
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			result.map(comp => {
				var row = document.createElement("tr");
				var compname = document.createElement("td");
				compname.innerHTML = comp.competition_name;
				var compdate = document.createElement("td");
				compdate.innerHTML = comp.competition_date;
				var compseas = document.createElement("td");
				compseas.innerHTML = comp.season_name;

				var del = document.createElement("td");
				var delbutton = document.createElement("input");
				delbutton.className = "delete editbutton btn";
				$(delbutton).attr('rel', "modal:open")
				delbutton.value = "Delete";
				delbutton.onclick = function () {
					event.preventDefault();
					this.blur(); // Manually remove focus from clicked link.
					$.get(this.href, function (html) {
						$('#modal').modal();
						$('#modal').data("compid", comp.competition_id);
						$('#m_info').html("The competition named <b>" + comp.competition_name + "</b> with the date of <b>" + comp.competition_date  + "</b> in the <b>" + comp.season_name + '</b> season?')
					});
				}
				delbutton.type = "submit";

				var edit = document.createElement("td");
				var editbutton = document.createElement("button");
				editbutton.className = "editbutton btn";
				editbutton.innerHTML = "Edit"
				editbutton.type = "submit";
				editbutton.id = "edit" + comp.competition_id;
				editbutton.onclick = function () {
					event.preventDefault();
					window.location.assign("edit_competitions.html?compid=" + comp.competition_id);
				}

				edit.appendChild(editbutton);
				del.appendChild(delbutton);

				row.appendChild(compname);
				row.appendChild(compdate);
				row.appendChild(compseas);
				row.appendChild(edit)
				row.appendChild(del);
				table.appendChild(row);
			})

		},
		error: error()
	});
}

function addCompetition() {
	window.location.assign("add_competitions.html");
}

$(document).ready(function (e) {
	$('#submit').on('click', function () {
		var compid = $('#modal').data('compid')
		$.ajax({
			url: '../includes/delete_competition.php',
			data: { comp_id: compid},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				console.log(result);
				load_competitions();
			},
			error: error()
		});
		$('#modal').removeData("compid");
	});
});