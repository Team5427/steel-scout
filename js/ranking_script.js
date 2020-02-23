$(window).on('load', function() {
	let token = getCookie("token");
	if(token != null) {
		$.ajax({
			url:'http://localhost/steel-scout-frontend/php/confirmlogin.php',
			data: {token: token},
			type: "POST", //or type:"GET" or type:"PUT"
			success: function (result) {
				//console.log("RESULT: "+result);
				result = JSON.parse(result);
				if(!result['authenticated'] || result['role'] !== 'LEAD') {
					window.location.assign("http://localhost/steel-scout-frontend/login.html");
				}
				pullData();
			},
			error: error()
		});
    }
    else{
        window.location.assign("http://localhost/steel-scout-frontend/login.html");
    }
});



function pullData(){
	var body = document.getElementById("ranking_body");
	while (body.firstChild) {
		body.removeChild(body.firstChild);
	}
	$.ajax({
		url:'http://localhost/steel-scout-frontend/php/getRankData.php',
		data: {},
		type: "POST", //or type:"GET" or type:"PUT"
		success: function (result) {
			//console.log("RESULT: "+result);
			result = JSON.parse(result);
			result.sort(
				function(data1, data2){
					if(data1.total_score != data2.total_score)
						return data2.total_score-data1.total_score;
					else{
						if(data1.teamNumber < data2.teamNumber) return -1;
						else if(data1.teamNumber < data2.teamNumber) return 1;
						else return 0;
					}
				}
			)
			//console.log("sorted: "+JSON.stringify(result));
			var ranknum = 1;
			result.map(data => {
				var row = document.createElement("tr");
				var rank = document.createElement("td");
				rank.innerHTML = ""+ranknum++;
				var team = document.createElement("td");
				team.innerHTML = data['teamNumber'];
				var score = document.createElement("td");
				score.innerHTML = data['total_score']
				row.appendChild(rank);
				row.appendChild(team);
				row.appendChild(score);
				body.appendChild(row);
			})
		},
		error: error()
	});
}

