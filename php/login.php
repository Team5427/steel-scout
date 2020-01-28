<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    //HTTP inputs
    // $rest_json = file_get_contents("php://input");
    // $_POST = json_decode($rest_json, true);
    
    
    $email =  $_POST['email'];
    $password = $_POST['password'];
    

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    //looking for matching username
    $sql = "SELECT * FROM users WHERE email=\"$email\"";
    $res = mysqli_query($con, $sql);


    //checking if password is correct
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        if($password == $row['password']){
            $token = bin2hex(random_bytes(64));
            

            $id = $row['id'];
            $sql = "UPDATE users SET token=\"$token\" WHERE id=$id";
            $res = mysqli_query($con, $sql);
            $response = array('authenticated' => true, 'token' => $token, 'role' => $row['role']);
            echo json_encode($response);
            exit;
        }
      }
    }

    //authentication failure
    $response = array('authenticated' => false, 'error' => 'Login Failure: Username or Password may be incorrect.');
    echo json_encode($response);
?>
