
window.onload = function() {
	document.getElementById("seasons_submit").onclick = function() {

		
		var seasonName = document.getElementById("season_name").value;
        var seasonYears = document.getElementById("season_years").value;
		console.log(seasonName);
        
		

		$.ajax({
			url: "../includes/seasons.php",
			data: {seasonName : seasonName,seasonYears : seasonYears},
			type: "POST",
			success: function(result) {
				console.log(result);
			},
			error: function(result){
				console.log("error");
			}
		});
		return false;
	};
	function realValue(x)
	{
		for (var i = 0; i < x.length; i++) {
			if (x[i].checked) {
				x=x[i].value;
				return x;
			}
		}	
	}

}
