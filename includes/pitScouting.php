<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

<<<<<<< HEAD
    $teamNumber = $_POST['teamNumber'];
    // $radio1 = $_POST['radio1'];
    // $radio2 = $_POST['radio2'];
    // $driveTeamExperience = $_POST['driveTeamExperience'];
    // $radio3 = $_POST['radio3'];
    // $radio4 = $_POST['radio4'];
    // $radio5 = $_POST['radio5'];
    // $radio6 = $_POST['radio6'];
    // $autonomousAbilities = $_POST['autonomousAbilities'];

    // $sql = "INSERT INTO pitscouting (teamNumber, radio1, radio2, driveTeamExperience, radio3, radio4, radio5, radio6, autonomousAbilities) 
    // VALUES ($teamNumber, $radio1, $radio2, $driveTeamExperience, $radio3, $radio4, $radio5, $radio6, \"$autonomousAbilities\")";

    $sql = "INSERT INTO 2020_pit_scouting (team_id)
    VALUES ($teamNumber)";
=======
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
>>>>>>> 35e448de9482a08167026a38d238e3e541580268

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