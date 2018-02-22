<?php
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
$con = mysql_connect($hostname,$username, $password) or die("could not connect to database");

if (mysql_errno())
{
  echo "Failed to connect to MySQL: " . mysql_connect_error();
}

mysql_select_db($dbname, $con);