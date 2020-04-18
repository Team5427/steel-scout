    <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();
if ($_POST['sender'] == "getold") {
    $sql = "SELECT * FROM seasons WHERE season_id=?";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $_POST['season_id']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['competition_name'] = $r['competition_name'];
            $data['competition_date'] = $r['competition_date'];
            $data['season_id'] = $r['season_id'];
        }
        else {
            $data['noexist'] = true;
        }
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
        $sql = "UPDATE  2020_competitions SET competition_id=?, WHERE competition_id=?";

    $stmt = mysqli_stmt_init($connection);
    if (mysqli_stmt_prepare($stmt, $sql)) {
        $competition_name = $_POST['competition_name'];
        $competition_date = $_POST['competition_date']
        $season_id = $_POST['season_id']
        mysqli_stmt_bind_param($stmt, "sss",$competition_name,$competition_date,$season_id);
        mysqli_stmt_execute($stmt);
        $data['success']= true;
    }
    else {
        $data['error'] = true;
    }
}
echo json_encode($data);
?>