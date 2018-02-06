<?php

$hostname="localhost";

// $username="bfpsolutions";
// $password="bfp_solutions1234.";
$username="root";
$password="";
$dbname="beach_front_parking";

$addmem  = "inventory_addmember";
$adminlogin = "inventory_adminlogin";
$order="inventory_order";
$compname  ="inventory_compname";
$data  ="inventory_data";
$hotel="inventory_hotel";



date_default_timezone_set("America/New_York");
$con = mysqli_connect($hostname,$username, $password) or die("could not connect to database");
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_select_db($con, $dbname);