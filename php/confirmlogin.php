<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");   
    
    $token =  $_POST['token'];

    

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    //looking for matching username
    $sql = "SELECT * FROM users WHERE token=\"$token\"";
    $res = mysqli_query($con, $sql);
    

    //checking where token matches
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        
        $response = array('authenticated' => true, 'token' => $token, 'role' => $row['role'], 'email'=> $row['email']);
        echo json_encode($response);
        exit;

      }
    }

    //authentication failure
    $response = array('authenticated' => false, 'error' => 'Login Failure: Username or Password may be incorrect.');
    echo json_encode($response);
?>
