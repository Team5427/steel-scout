<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

   <?php require_once("db_connection.php"); ?>

   <?php 
        $name = $_POST['name'];
        $date = $_POST['date'];


        if($connection -> connect_error)
        {
            die("Connection failed: " . $connection -> connect_error);
        }

         $sql = "INSERT INTO 2020_competitions (competition_name,competition_date) VALUES (\"$name\",$date)";

        if($con->query($sql) === true)
        {
            echo "logged";
        }
        else
        {
            echo "Error: " . $sql . "<br>" . $con->error;
        }

        mysqli_close($connection);
    ?>
            
