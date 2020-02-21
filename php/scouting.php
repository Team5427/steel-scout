<?php
    header("Access-Control-Allow-Origin: *");
    //header("Access-Control-Allow-Headers: *");

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

    //connect to database
    $con = mysquli_connect("localhost", "root", "", "steel-scout");

    if($con -> connect_error)
    {
        die("Connection failed: " . $con -> connect_error);
    }

    $sql = INSERT INTO scouting (teamNumber, author, matchNumber, powerCellsHighOne, powerCellsLowOne, radio1, powerCellsHighTwo, powerCellsLowTwo, radio2, powerCellsHighThree, powerCellsLowThree, radio3, radio4, radio5, finalRP, radio6)
    VALUES ($teamNumber, $author, $matchNumber, $powerCellsHighOne, $powerCellsLowOne, $radio1, $powerCellsHighTwo, $powerCellsLowTwo, $radio2, $powerCellsHighThree, $powerCellsLowThree, $radio3, $radio4, $radio5, $finalRP, $radio6)

    if($con->query($sql) === TRUE)
    {
        echo "New record created successfully!";
    }
    else
    {
        echo "Error! Make sure you have only digits where there are number inputs!";
    }

    mysqli_close($con);
?>