<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $username =  $_POST['username'];
    $password =  $_POST['password'];
    $admin = $_POST['admin'];

    //looking for all users username
    $sql = "SELECT * FROM scouters WHERE username = \"$username\"";
    $res = mysqli_query($connection, $sql);

    //collects all users
    if(mysqli_num_rows($res)>0){
        die;
    }
   

    //looking for matching user
    $sql = "INSERT INTO scouters (username, password, admin) VALUES (\"$username\", \"$password\", \"$admin\")";
    $res = mysqli_query($connection, $sql);
    echo "success";
    die;
 ?>