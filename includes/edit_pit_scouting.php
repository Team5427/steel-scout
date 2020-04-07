<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();
if ($_POST['sender'] == "getold") {
    $sql = "SELECT * FROM 2020_pit_scouting WHERE team_id=?";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $_POST['team_id']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['team_id'] = $r['team_id'];
             $data['canClimb'] = $r['climb']; 
             $data['inner'] = $r['inner_port'];
             $data['higher'] = $r['higher_port'];
             $data['lower'] = $r['lower_port'];
             $data['drive_team_exp'] = $r['drive_team_experience'];
             $data['defense'] = $r['defense'];
             $data['auto'] = $r['autonomous_abilities'];
        }
        else {
            $data['noexist'] = true;
        }
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
    $sql = "UPDATE 2020_pit_scouting SET team_id=?, climb=?, drive_team_experience=?, inner_port=?, higher_port=?, lower_port=?, defense=?, autonomous_abilities=? WHERE team_id=?";
    // $sql = "UPDATE 2020_pit_scouting SET team_id=?, climb=?, drive_team_experience=?, WHERE team_id=?";
    $stmt = mysqli_stmt_init($connection);
    if (mysqli_stmt_prepare($stmt, $sql)) {
        $team_id = $_POST['team_id'];
        $canClimb = $_POST['canClimb'];
        $avgexp = (int)($_POST['avgdexp']);
        $inner = $_POST['inner'];
        $upper = $_POST['upper'];
        $lower = $_POST['lower'];
        $defense = $_POST['defense'];
        $auton = $data['auton'] = $_POST['auton'];
        $old = $_POST['oldID'];
        mysqli_stmt_bind_param($stmt, "ssissssss",$team_id,$canClimb,$avgexp,$inner,$upper,$lower,$defense,$auton,$_POST['oldID']);
        if(mysqli_stmt_execute($stmt)) {
            $data['success']= true;
        }
        else {
            $data['success']= false; 
        }
    }
    else {
        $data['error'] = true;
        $data['emsg'] = mysqli_stmt_error($stmt);
    }
}
echo json_encode($data);
?>