<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $username =  $_POST['email'];
    $password =  $_POST['password'];
    $role = $_POST['role'];
    $append = $_POST['append'];

    if($append){
        
        //looking for matching user
        $sql = "INSERT INTO users (email, password, role) VALUES (\"$username\", \"$password\", \"$role\")";
        $res = mysqli_query($connection, $sql);
        echo "success";
        die;
    }
    //checks if this is not a preflight request
    else if ($username != ""){
        //looking for matching user to delete
        $sql = "DELETE FROM users WHERE email = \"$username\"";
        $res = mysqli_query($connection, $sql);
        echo "success";
        die;
    }
    echo "failure";
 ?>