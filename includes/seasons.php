<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $seasonName = $_POST['seasonName'];
    $seasonYears = $_POST['seasonYears'];


    $sql = "INSERT INTO seasons (season_id, season_name)
    VALUES ( \"$seasonYears\", \"$seasonName\")";


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