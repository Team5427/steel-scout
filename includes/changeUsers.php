<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $username =  $_POST['username'];
    $password =  $_POST['password'];
    $admin = $_POST['admin'];


        
    //looking for matching user
    $sql = "INSERT INTO scouters (username, password, admin) VALUES (\"$username\", \"$password\", \"$admin\")";
    $res = mysqli_query($connection, $sql);
    echo "success";
    die;
    

 ?>