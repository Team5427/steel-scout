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


        $sql= "SELECT * FROM scouters WHERE username=?";
        $stmt= mysqli_stmt_init($connection);

        if(!mysqli_stmt_prepare($stmt, $sql)) 
        {
            exit();
        } 
        else 
        {
            mysqli_stmt_bind_param($stmt,"s",$username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $existcount = mysqli_stmt_num_rows($stmt);
            if($existcount!=0) 
            {
                exit();
            }
        }


    
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