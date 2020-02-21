<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    //looking for matching username
    $sql = "SELECT * FROM scouting";
    $res = mysqli_query($con, $sql);


    $rows = [];
    //checking if password is correct
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        $score = $row['powerCellsHighOne'] + $row['powerCellsLowOne'] + $row['powerCellsHighTwo'] + $row['powerCellsLowTwo'] + $row['powerCellsHighThree'] + $row['powerCellsLowThree'];
        $scores = array('teamNumber' => $row['teamNumber'], 'total_score' => $score);
        array_push($rows, $scores);
      }
    }

    echo json_encode($rows);
?>
