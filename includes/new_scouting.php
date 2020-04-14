<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("db_connection.php"); ?>



<?php
    $team_id = $_POST['team_id'];
    $scouter_id = $_POST['scouter_id'];
    $competition_id = $_POST['competition_id'];
//    $matchNumber = $_POST['matchNumber'];
//    $powerCellsHighOne = $_POST['powerCellsHighOne'];
//    $powerCellsLowOne = $_POST['powerCellsLowOne'];
//    $radio1 = $_POST['radio1'];
//    $powerCellsHighTwo = $_POST['powerCellsHighTwo'];
//    $powerCellsLowTwo = $_POST['powerCellsLowTwo'];
//    $radio2 = $_POST['radio2'];
//    $powerCellsHighThree = $_POST['powerCellsHighThree'];
//    $powerCellsLowThree = $_POST['powerCellsLowThree'];
//    $radio3 = $_POST['radio3'];
//    $radio4 = $_POST['radio4'];
//    $radio5 = $_POST['radio5'];
//    $finalRP = $_POST['finalRP'];
//    $radio6 = $_POST['radio6'];
//    $radio7 = $_POST['radio7'];

    if($connection -> connect_error)
    {
        die("Connection failed: " . $connection -> connect_error);
    }

    $sql = "INSERT INTO 2020_scouting (team_id, scouter_id, competition_id) VALUES ($team_id, $scouter_id, $competition_id)";

    if($connection->query($sql) === true)
    {
        echo "logged";
    }
    else
    {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }

    mysqli_close($connection);
?>