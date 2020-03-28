<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $teamNumber = $_POST['teamNumber'];
    $canClimb = $_POST['canClimb'];
    $driveTeamExperience = $_POST['driveTeamExperience'];
    $innerPort = $_POST['innerPort'];
    $upperPort = $_POST['upperPort'];
    $lowerPort = $_POST['lowerPort'];
    $defenseBot = $_POST['defenseBot'];
    $autonomousAbilities = $_POST['autonomousAbilities'];

    $sql = "INSERT INTO 2020_pit_scouting (team_id, climb, drive_team_experience, inner_port, higher_port, lower_port, defense, autonomous_abilities) 
    VALUES ($teamNumber, $canClimb, $driveTeamExperience, $innerPort, $upperPort, $lowerPort, $defenseBot, \"$autonomousAbilities\")";


    if($connection->query($sql) === true)
    {
        echo "logged";
    }
    else
    {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }
   

    mysqli_close($connection);
?>