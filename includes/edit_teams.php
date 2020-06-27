<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();
if ($_POST['sender'] == "getold") {
    $sql = "SELECT * FROM teams WHERE team_id=?";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $_POST['team_id']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['team_id'] = $r['team_id'];
            $data['team_number'] = $r['team_number'];
            $data['team_name'] = $r['team_name'];
        }
        else {
            $data['noexist'] = true;
        }
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
        $sql = "UPDATE teams SET team_number=?, team_name=? WHERE team_id=?";

    $stmt = mysqli_stmt_init($connection);
    if (mysqli_stmt_prepare($stmt, $sql)) {
        $team_id = $_POST['oldID'];
        $team_num = $_POST['team_number'];
        $team_name = $_POST['team_name'];
        mysqli_stmt_bind_param($stmt, "sss",$team_num,$team_name,$team_id);
        mysqli_stmt_execute($stmt);
        $data['success']= true;
    }
    else {
        $data['error'] = true;
    }
}
echo json_encode($data);
?>