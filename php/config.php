<?php
session.start();
$host = "localhost";
$user = "steel-scout";
$password = "!te@m5427!";
$dbname = "steel_scout";

$con = mysqli_connect($host, $user, $password, $dbname);

if(!$con)
{
    die("Connection failed: " . mysqli_connect_error());
}