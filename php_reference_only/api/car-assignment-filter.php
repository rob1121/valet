<?php
include('connect.php');

$sql = sprintf('select * from %s where status_id <> %d and status_id <> %d',
  'parking_status',
  REQUEST_COMPLETED,
  REQUEST_ERROR
);

$retVal = mysqli_query($con, $sql);
$retVal = mysqli_fetch_all($retVal, MYSQLI_ASSOC);
$retVal = array_map(function($status) { return strtoupper($status['status']); }, $retVal);

mysqli_close($con);


echo json_encode($retVal);