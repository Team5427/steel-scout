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
        $balls = $row['powerCellsHighOne'] + $row['powerCellsLowOne'] + $row['powerCellsHighTwo'] + $row['powerCellsLowTwo'] + $row['powerCellsHighThree'] + $row['powerCellsLowThree'];
        
        if(containsTeam($row['teamNumber'], $rows)){

          for ($x = 0; $x < count($rows); $x++) {
            if($rows[$x]['teamNumber'] == $row['teamNumber']){
              $rows[$x]['balls']+=$balls;
              $rows[$x]['entries']++;
              $rows[$x]['avg_balls'] = ($rows[$x]['balls'])/($rows[$x]['entries']);
              $rows[$x]['manipulateWheel'] += ($row['radio2'] || $row['radio3'])?1:0;
              $rows[$x]['innerPort'] +=$row['radio7'] ? 1: 0;
              $rows[$x]['outerPort'] +=(($row['powerCellsHighThree'] + $row['powerCellsHighOne'] + $row['powerCellsHighTwo']) > 0) ? 1: 0;
              $rows[$x]['lowerPort'] +=(($row['powerCellsLowThree'] + $row['powerCellsLowOne'] + $row['powerCellsLowTwo']) > 0)? 1: 0;

              $rows[$x]['total_score'] =  (($rows[$x]['avg_balls']/29) * .25 + $rows[$x]['manipulateWheel']/$rows[$x]['entries'] * .17
               + $rows[$x]['innerPort']/$rows[$x]['entries'] *.1 + $rows[$x]['outerPort']/$rows[$x]['entries']*.08 + $rows[$x]['lowerPort']/$rows[$x]['entries'] *.05) * 100;
            }
          }

        }
        else{
          $outerPort = (($row['powerCellsHighThree'] + $row['powerCellsHighOne'] + $row['powerCellsHighTwo']) > 0) ? 1: 0;
          $lowerPort = (($row['powerCellsLowThree'] + $row['powerCellsLowOne'] + $row['powerCellsLowTwo']) > 0)? 1: 0;
          $innerPort = $row['radio7'] ? 1: 0;
          $manipulateWheel = ($row['radio2'] || $row['radio3'])?1:0;
          $scores = array(
            'teamNumber' => $row['teamNumber'],
            'balls' => $balls,
            'entries' => 1,
            'avg_balls' => $balls,
            'manipulateWheel' => $manipulateWheel,
            'innerPort' => $innerPort,
            'outerPort' => $outerPort,
            'lowerPort' => $lowerPort,
            'total_score' => (($balls/29) * .25 + $manipulateWheel * .17 + $innerPort *.1 + $outerPort*.08+ $lowerPort*.05) * 100,
        );
          array_push($rows, $scores);
        }
      }
    }

    echo json_encode($rows);
?>
