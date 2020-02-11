<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");


    //looking for all users username
    $sql = "SELECT * FROM users";
    $res = mysqli_query($con, $sql);


    $rows = [];
    //collects all users
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        array_push($rows, $row);
      }
    }

    echo json_encode($rows);
?>
