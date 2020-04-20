<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
?>

<?php require_once("db_connection.php"); ?>



<?php
    $team_id = $_POST['team'];
    $scouter_id = $_POST['scouter'];
    $competition_id = $_POST['competition'];

    if($connection -> connect_error)
    {
        die("Connection failed: " . $connection -> connect_error);
    }

    $sql = "INSERT INTO 2020_scouting (team_id, scouter_id, competition_id) VALUES ($team_id, $scouter_id, $competition_id)";

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