<?php

include('connect.php');


$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

$sql = "select *  from parking_order where name LIKE '%{$_GET['name']}%'";
$result = mysql_query($sql);

if(!$result) {
  echo("Error description: " . mysql_error());
}

$retVal = [];

while($row = mysql_fetch_array($result)) {
  $retVal[] = $row; 
}


mysql_close($con);

echo json_encode($retVal);