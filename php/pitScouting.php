<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $teamNumber = $_POST['teamNumber'];

    //connect to database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    if($con -> connect_error)
    {
        die("Connection failed: " . $con -> connect_error);
    }

    $sql = "INSERT INTO pitscouting (teamNumber) VALUES ($teamNumber)";

    if($con->query($sql) === true)
    {
        echo "logged";
    }
    else
    {
        echo "Error: " . $sql . "<br>" . $con->error;
    }

    mysqli_close($con);
?>