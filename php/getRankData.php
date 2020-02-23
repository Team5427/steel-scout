<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    //connecting to SQL Database
    $con = mysqli_connect("localhost", "root", "", "steel-scout");

    //looking for matching username
    $sql = "SELECT * FROM scouting";
    $res = mysqli_query($con, $sql);

    function containsTeam($team, $rows){
      $contains = false;
      foreach($rows as $row){
        if($row['teamNumber'] == $team)
          $contains = true;
      }
      return $contains;
    }

    $rows = [];
    //checking if password is correct
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        $score = $row['powerCellsHighOne'] + $row['powerCellsLowOne'] + $row['powerCellsHighTwo'] + $row['powerCellsLowTwo'] + $row['powerCellsHighThree'] + $row['powerCellsLowThree'];
        
        if(containsTeam($row['teamNumber'], $rows)){

          for ($x = 0; $x < count($rows); $x++) {
            if($rows[$x]['teamNumber'] == $row['teamNumber']){
              $rows[$x]['score']+=$score;
              $rows[$x]['entries']++;
              $rows[$x]['total_score'] = ($rows[$x]['score'])/($rows[$x]['entries']);
            }
          }

        }
        else{
          $scores = array('teamNumber' => $row['teamNumber'], 'score' => $score, 'entries' => 1, 'total_score' => $score);
          array_push($rows, $scores);
        }
      }
    }

    echo json_encode($rows);
?>
