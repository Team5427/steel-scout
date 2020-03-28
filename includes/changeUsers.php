<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
if ($_POST['sender'] == "getold") {
    $data = array();
    
    $sql = "SELECT * FROM 2020_scouters";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $_POST['email']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['fn'] = $r['first_name'];
            $data['ln'] = $r['last_name'];
            $data['un'] = $r['username'];
            $data['pw'] = $r['password'];
            $data['op'] = $r['admin'];
        }
        else {
            $data['noexist'] = true;
        }
        echo json_encode($data);
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
}
?>