<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");



    //connect to database
    $con = mysquli_connect("localhost", "root", "", "steel-scout");

    if($con -> connect_error)
    {
        die("Connection failed: " . $con -> connect_error);
    }

    

?>