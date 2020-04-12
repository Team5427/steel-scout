<?php
    //CORS Headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
    
    //looking for all users username
    $sql = "SELECT * FROM 2020_competitions ORDER BY competition_name";
    $res = mysqli_query($connection, $sql);


    $rows = [];
    //collects all users
    if(mysqli_num_rows($res)>0){
      while($row = mysqli_fetch_assoc($res)){

        $id = $row['season_id'];
        $sql = "SELECT season_name FROM seasons WHERE season_id=$id";
        $idres = mysqli_query($connection, $sql);
        $row['season_name'] = mysqli_fetch_assoc($idres)['season_name'];

        array_push($rows, $row);
      }
    }

    echo json_encode($rows);
?>
