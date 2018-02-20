<?php
include('connect.php');

$retVal = [];

$sql = 'select * from parking_status';

$result = mysql_query($sql);
while($row = mysql_fetch_array($result)) {
  $retVal[$row['status_id']] = strtoupper($row['status']); 
}

mysql_close($con);


echo json_encode($retVal);