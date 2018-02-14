<?php
include('connect.php');

$sql = 'select distinct name from parking_order';

$result = mysqli_query($con, $sql);
$result = mysqli_fetch_all($result, MYSQLI_ASSOC);

$retVal = [];

array_map(function($status) use(&$retVal) { 
  $retVal[] = [
    'label' => strtoupper($status['name']),
    'value' => strtolower($status['name']),
  ]; 
}, $result);

mysqli_close($con);


echo json_encode($retVal);