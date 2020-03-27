<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php

    $scouter_id =  $_POST['scouter_id'];
  
    //looking for matching user to delete
    $sql = "DELETE FROM scouters WHERE scouter_id = \"$scouter_id\"";
    $res = mysqli_query($connection, $sql);
    echo $scouter_id;

 ?>