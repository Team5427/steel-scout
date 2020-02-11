<?php


    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");


    $username =  $_POST['email'];
    $password =  $_POST['password'];
    $role = $_POST['role'];
    $append = $_POST['append'];

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    if($append){
        
        //looking for matching user
        $sql = "INSERT INTO users (email, password, role) VALUES (\"$username\", \"$password\", \"$role\")";
        $res = mysqli_query($con, $sql);
        echo "success";
        die;
    }
    //checks if this is not a preflight request
    else if ($username != ""){
        //looking for matching user to delete
        $sql = "DELETE FROM users WHERE email = \"$username\"";
        $res = mysqli_query($con, $sql);
        echo "success";
        die;
    }
    echo "failure";
    ?>