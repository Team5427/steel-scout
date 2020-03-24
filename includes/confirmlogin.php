<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");   
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
    
    $token =  $_POST['token'];

    //looking for matching username
    $sql = "SELECT * FROM users WHERE token=\"$token\"";
    $res = mysqli_query($connection, $sql);
    

    //checking where token matches
    if($res != false && mysqli_num_rows($res)>0){
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
