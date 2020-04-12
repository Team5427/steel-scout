<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();

if ($_POST['sender'] == "loading") {
    $sql = "SELECT * FROM seasons";
    $res = mysqli_query($connection, $sql);

    $rows = array();
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){
        array_push($rows, $row);
      }
      $data['seasons'] = $rows;
    }

} else {
    $name = $_POST['name'];
    $date = $_POST['date'];
    $season = $_POST['season_id'];

    $sql = "INSERT INTO 2020_competitions (competition_name, competition_date, season_id) VALUES (\"$name\",\"$date\",\"$season\")";
    $res = mysqli_query($connection, $sql);

    $data['error'] = mysqli_error($connection);
    $data['success'] = true;
    $data['name'] = $name;
    $data['date'] = $date;
    $data['season'] = $season;
}


echo json_encode($data);
