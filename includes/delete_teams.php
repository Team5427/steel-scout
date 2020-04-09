<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    require_once("db_connection.php"); 

    $team_id = $_POST["team_id"];

    //looking for all users username
    $sql = "DELETE FROM teams WHERE team_id = $team_id";
    $res = mysqli_query($connection, $sql);
   
 
    echo mysqli_error($connection);
?>