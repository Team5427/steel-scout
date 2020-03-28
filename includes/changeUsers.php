<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>

<?php require_once("../includes/db_connection.php"); ?>

<?php
$data = array();
if ($_POST['sender'] == "getold") {
    $sql = "SELECT * FROM 2020_scouters WHERE email=?";
    $stmt = mysqli_stmt_init($connection);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $_POST['email']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($r = mysqli_fetch_assoc($result)) {
            $data['fn'] = $r['first_name'];
            $data['ln'] = $r['last_name'];
            $data['em'] = $r['email'];
            $data['pw'] = $r['password'];
            $data['op'] = $r['admin'];
        }
        else {
            $data['noexist'] = true;
        }
    } else {
        $data['error'] = true;
    }
} else if ($_POST['sender'] == "update") {
    $sql = "UPDATE 2020_scouters SET first_name=?, last_name=?, email=?, password=?, admin=? WHERE email=?";
    $stmt = mysqli_stmt_init($connection);
    if (mysqli_stmt_prepare($stmt, $sql)) {
        $fn = $_POST['firstname'];
        $ln = $_POST['lastname'];
        $em = $_POST['email'];
        $pw = $_POST['password'];
        $op = $_POST['admin'];
        mysqli_stmt_bind_param($stmt, "ssssss",$fn,$ln,$em,$pw,$op,$em);
        mysqli_stmt_execute($stmt);
        $data['success']= true;
    }
    else {
        $data['error'] = true;
    }
}
echo json_encode($data);
?>