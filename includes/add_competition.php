<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    require_once("db_connection.php"); 

   $name = $_POST['name'];
    // $date = $_POST['date'];
    //looking for all users username
    $sql = "SELECT * FROM 2020_competitions WHERE competition_name = \"$name\"";
    $res = mysqli_query($connection, $sql);

    //collects all users
    if(mysqli_num_rows($res)>0){
        $response = array('success' => false, 'error' => "Duplicate value entered.");
        echo json_encode($response);
    }
    else{
        //looking for matching user
        $sql = "INSERT INTO 2020_competitions (competition_name) VALUES (\"$name\")";
        $res = mysqli_query($connection, $sql);

        $response = array('success' => true);
        echo json_encode($response);
    }
 ?>