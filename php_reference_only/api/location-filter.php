<?php
include('connect.php');

$sql = 'select distinct location from parking_location';

$result = mysqli_query($con, $sql);
$result = mysqli_fetch_all($result, MYSQLI_ASSOC);

$retVal = [];

array_map(function($status) use(&$retVal) { 
  $retVal[] = [
    'label' => strtoupper($status['location']),
    'value' => strtolower($status['location']),
  ]; 
}, $result);

mysqli_close($con);


echo json_encode($retVal);