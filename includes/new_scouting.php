<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("db_connection.php"); ?>



<?php
    $team_id = $_POST['team'];
    $scouter_id = $_POST['scouter'];
    $competition_id = $_POST['competition'];
    $match_number_id = $_POST['match'];
    
    $auto_line_id = $_POST['auto_line'];
    $auto_high_id = $_POST['auto_high'];
    $auto_low_id = $_POST['auto_low'];
    $auto_collect_id = $_POST['auto_collect'];
    
    $stage1_high_id = $_POST['stage1_high'];
    $stage1_low_id = $_POST['stage1_low'];
    $stage1_complete_id = $_POST['stage1_complete'];
    
    $stage2_high_id = $_POST['stage2_high'];
    $stage2_low_id = $_POST['stage2_low'];
    $rotation_id = $_POST['rotation_control'];

    $stage3_high_id = $_POST['stage3_high'];
    $stage3_low_id = $_POST['stage3_low'];
    $position_id = $_POST['position_control'];
    $stage3_complete_id = $_POST['stage3_complete'];
    
    if($connection -> connect_error)
    {
        die("Connection failed: " . $connection -> connect_error);
    }

    $sql = "INSERT INTO 2020_scouting (team_id, scouter_id, competition_id, match_number,auto_line,auto_high_target,auto_low_target,auto_collect_balls,stage1_high_target,stage1_low_target, stage1_completed,stage2_high_target,stage2_low_target,rotation_control, stage3_high_target,stage3_low_target,stage3_completed,position_control) VALUES ($team_id, $scouter_id, $competition_id, $match_number_id,$auto_line_id,$auto_high_id,$auto_high_id,$auto_collect_id,$stage1_high_id,$stage1_low_id,$stage1_complete_id,$stage2_high_id,$stage2_low_id,$rotation_id,$stage3_high_id,$stage3_low_id,$stage3_complete_id,$position_id)";

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