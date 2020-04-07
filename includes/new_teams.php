<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    require_once("db_connection.php"); 

    $team_number = $_POST['team_number'];

    //looking for all users username
    $sql = "SELECT * FROM teams WHERE team_number = \"$team_number\"";
    $res = mysqli_query($connection, $sql);

    //collects all users
    if(mysqli_num_rows($res)>0){
        $response = array('success' => false, 'error' => "Duplicate value entered.");
        echo json_encode($response);
    }
    else{
        //looking for matching user
        $sql = "INSERT INTO teams (team_number) VALUES (\"$team_number\")";
        $res = mysqli_query($connection, $sql);

        $response = array('success' => true);
        echo json_encode($response);
    }
 ?>
