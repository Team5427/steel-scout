<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

?>
<?php

$team = $_POST['teamNumber'];
$driveTeamExperience = $_POST['driveTeamExperience'];
$autonomousAbilities =  $_POST['autonomousAbilities'];
$radio5 =  $_POST['radio5'];
$radio6 = $_POST['radio6'];
$radio4 =  $_POST['radio4'];
$radio3 =  $_POST['radio3'];
$radio6 = $_POST['radio6'];
$radio2 = $_POST['radio2'];
$radio1 = $_POST['radio1'];



// NEED TO DO THE %SQL STUFF FOR LINE 24
//looking for all pit_scouting forms
$sql = "SELECT * FROM 2020_pit_scouting WHERE email = \"$email\", ";
$res = mysqli_query($connection, $sql);

//collects all users
if (mysqli_num_rows($res) > 0) {
    die;
}


//looking for matching user
$sql = "INSERT INTO 2020_pit_scouting (team_id, climb, adjust_level,drive_team_experience, inner_port, higher_port,lower_port, defense, autonomousAbilities) VALUES (\"$team_id\",\"$climb\",\"$adjust_level\", \"$drive_team_experience\", \"$inner_port\",  \"$higher_port\", \"$lower_port\", \"$inner_port\", \"$defense\", \"$autonomousAbilities\")";
$res = mysqli_query($connection, $sql);
echo "success";
die;
?>