<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $username =  $_POST['username'];
    $password =  $_POST['password'];
    $admin = $_POST['admin'];
    $append = $_POST['append'];

    if($append){
        
        //looking for matching user
        $sql = "INSERT INTO scouters (username, password, admin) VALUES (\"$username\", \"$password\", \"$admin\")";
        $res = mysqli_query($connection, $sql);
        echo "success";
        die;
    }
    //checks if this is not a preflight request
    else if ($username != ""){
        //looking for matching user to delete
        $sql = "DELETE FROM scouters WHERE username = \"$username\"";
        $res = mysqli_query($connection, $sql);
        echo "success";
        die;
    }
    echo "failure";
 ?>