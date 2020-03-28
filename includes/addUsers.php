<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email =  $_POST['email'];
    $password =  $_POST['password'];
    $admin = $_POST['admin'];

    //looking for all users username
    $sql = "SELECT * FROM 2020_scouters WHERE email = \"$email\"";
    $res = mysqli_query($connection, $sql);

    //collects all users
    if(mysqli_num_rows($res)>0){
        die;
    }
   

    //looking for matching user
    $sql = "INSERT INTO 2020_scouters (first_name, last_name, email, password, admin) VALUES (\"$firstname\",\"$lastname\",\"$email\", \"$password\", \"$admin\")";
    $res = mysqli_query($connection, $sql);
    echo "success";
    die;
 ?>