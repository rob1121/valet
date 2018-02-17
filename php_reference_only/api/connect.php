<?php

define('REQUEST_COMPLETED', 5);
define('REQUEST_ERROR', 6);

$hostname="localhost";

$username="bfpsolutions";
$password="bfp_solutions1234.";
$dbname="bfp_dev";

$addmem  = "parking_addmember";
$adminlogin = "parking_adminlogin";
$order="parking_order";
$compname  ="parking_compname";
$data  ="parking_data";
$hotel="parking_hotel";



date_default_timezone_set("America/New_York");
$con = mysqli_connect($hostname,$username, $password) or die("could not connect to database");
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_select_db($con, $dbname);