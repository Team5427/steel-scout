<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
    $team_number =  $_POST['team_number'];
    $pit_scouting_id =  $_POST['pit_scouting_id'];
  
    //looking for matching user to delete
    $sql = "DELETE FROM 2020_pit_scouting WHERE pit_scouting_id = \"$pit_scouting_id\"";
    $res = mysqli_query($connection, $sql);
    echo $team_number;
 ?>