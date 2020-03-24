<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $teamNumber = $_POST['teamNumber'];
    $radio1 = $_POST['radio1'];
    $radio2 = $_POST['radio2'];
    $driveTeamExperience = $_POST['driveTeamExperience'];
    $radio3 = $_POST['radio3'];
    $radio4 = $_POST['radio4'];
    $radio5 = $_POST['radio5'];
    $radio6 = $_POST['radio6'];
    $autonomousAbilities = $_POST['autonomousAbilities'];

    $sql = "INSERT INTO pitscouting (teamNumber, radio1, radio2, driveTeamExperience, radio3, radio4, radio5, radio6, autonomousAbilities) 
    VALUES ($teamNumber, $radio1, $radio2, $driveTeamExperience, $radio3, $radio4, $radio5, $radio6, \"$autonomousAbilities\")";

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