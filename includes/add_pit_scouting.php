<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $team_id = $_POST['team'];
    $scouter_id = $_POST["scouter"];
    $competition_id = $_POST["competition"];
    $climb = $_POST["climb"];
    $adjust_level = $_POST["adjust_level"];
    $drive_team_experience = $_POST["drive_team_experience"];
    $inner_port = $_POST["inner_port"];
    $higher_port = $_POST["higher_port"];
    $lower_port = $_POST["lower_port"];
    $defense = $_POST["defense"];
    $autonomous_abilities = $_POST["autonomous_abilities"];

    $sql = "INSERT INTO 2020_pit_scouting (scouter_id, competition_id, team_id, climb, adjust_level, drive_team_experience, inner_port, higher_port, lower_port, defense, autonomous_abilities) 
    VALUES ($scouter_id, $competition_id, $team_id, $climb, $adjust_level, $drive_team_experience, $inner_port, $higher_port, $lower_port, $defense, \"$autonomous_abilities\")";

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