<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
    
    //looking for all users username
    $sql = "SELECT * FROM infinite_recharge_pitscouting";
    $res = mysqli_query($connection, $sql);


    $rows = [];
    //collects all users
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        array_push($rows, $row);
      }
    }

    echo json_encode($rows);
?>