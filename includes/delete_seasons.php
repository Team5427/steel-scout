<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    require_once("db_connection.php"); 

    $season_id = $_POST["season_id"];

    //looking for all users username
    $sql = "DELETE FROM seasons WHERE season_id = $season_id";
    $res = mysqli_query($connection, $sql);
   
 
    echo mysqli_error($connection);
?>