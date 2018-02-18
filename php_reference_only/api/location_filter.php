<?php

include('connect.php');

$sql = 'select distinct location from parking_location';
$result = mysql_query($sql);

if(!$result) {
  echo("Error description: " . mysql_error());
}

$retVal = [];

while($row = mysql_fetch_array($result)) {
  $retVal[] = [
    'label' => strtoupper($row['location']),
    'value' => strtolower($row['location']),
  ]; 
}

mysql_close($con);

echo json_encode($retVal);