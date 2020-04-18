<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();
if ($_POST['sender'] == "getold") {
    $sql = "SELECT * FROM 2020_competitions WHERE competition_id=?, season_id =?";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "ss", $_POST['competition_id'],$_POST['season_id']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['competition_id'] = $r['competition_id'];
            $data['name'] = $r['competition_name'];
            $data['date'] = $r['competition_date'];
            $data['season'] = $r['season_id'];
        }
        else {      
            $data['noexist'] = true;
        }
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
        $sql = "UPDATE teams SET competition_name=?, competition_date=? WHERE competition_id=?, season_id =?";

    $stmt = mysqli_stmt_init($connection);
    if (mysqli_stmt_prepare($stmt, $sql)) {
        $competition_id = $_POST['oldID'];
        $name = $_POST['competition_name'];
        $date = $_POST['competition_date'];
        $season = $_POST['season_id'];

        mysqli_stmt_bind_param($stmt, "sss",$name,$date,$season,$competition_id);
        mysqli_stmt_execute($stmt);
        $data['success']= true;
    }
    else {
        $data['error'] = true;
    }
}
echo json_encode($data);
?>