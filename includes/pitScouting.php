<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $team_id = $_POST['team_id'];
    $competition_id = $_POST['competition_id'];
    $climb = $_POST['climb'];
    $adjust_level = $_POST['adjust_level'];
    $drive_team_experience = $_POST['drive_team_experience'];
    $inner_port = $_POST['inner_port'];
    $higher_port = $_POST['higher_port'];
    $lower_port = $_POST['lower_port'];
    $defence = $_POST['defence'];
    $autonomousAbilities = $_POST['autonomousAbilities'];


    $sql = "INSERT INTO infinite_recharge_pitscouting (competition_id, team_id, climb, adjust_level, drive_team_experience, inner_port, higher_port, lower_port, defence, autonomousAbilities) 
    VALUES ($competition_id, $team_id, $climb, $adjust_level, $drive_team_experience, $inner_port, $higher_port, $lower_port,$defence, \"$autonomousAbilities\")";

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