<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection/php"); ?>



<?php
    $teamNumber = $_POST['teamNumber'];
    $author = $_POST['author'];
    $matchNumber = $_POST['matchNumber'];
    $powerCellsHighOne = $_POST['powerCellsHighOne'];
    $powerCellsLowOne = $_POST['powerCellsLowOne'];
    $radio1 = $_POST['radio1'];
    $powerCellsHighTwo = $_POST['powerCellsHighTwo'];
    $powerCellsLowTwo = $_POST['powerCellsLowTwo'];
    $radio2 = $_POST['radio2'];
    $powerCellsHighThree = $_POST['powerCellsHighThree'];
    $powerCellsLowThree = $_POST['powerCellsLowThree'];
    $radio3 = $_POST['radio3'];
    $radio4 = $_POST['radio4'];
    $radio5 = $_POST['radio5'];
    $finalRP = $_POST['finalRP'];
    $radio6 = $_POST['radio6'];
    $radio7 = $_POST['radio7'];

    if($connection -> connect_error)
    {
        die("Connection failed: " . $connection -> connect_error);
    }

    $sql = "INSERT INTO scouting (teamNumber, author, matchNumber, powerCellsHighOne, powerCellsLowOne, radio1, powerCellsHighTwo, powerCellsLowTwo, radio2, powerCellsHighThree, powerCellsLowThree, radio3, radio4, radio5, finalRP, radio6, radio7)
    VALUES ($teamNumber, \"$author\", $matchNumber, $powerCellsHighOne, $powerCellsLowOne, $radio1, $powerCellsHighTwo, $powerCellsLowTwo, $radio2, $powerCellsHighThree, $powerCellsLowThree, $radio3, $radio4, $radio5, $finalRP, $radio6, $radio7)";

    //$res = mysqli_query($con, $sql);

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