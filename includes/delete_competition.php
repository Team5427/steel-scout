<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
    $compID = $_POST['comp_id'];

    $sql = "DELETE FROM 2020_competitions WHERE competition_id = \"$compID\"";
    $res = mysqli_query($connection, $sql);
    echo $compID;
?>