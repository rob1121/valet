<?php
include('connect.php');

$sql = sprintf('select * from %s where status_id <> %d and status_id <> %d',
  'parking_status',
  REQUEST_COMPLETED,
  REQUEST_ERROR
);

$result = mysqli_query($con, $sql);
$result = mysqli_fetch_all($result, MYSQLI_ASSOC);

$retVal = [
  'all' => [],
  'pickup' => [],
  'delivery' => [],
];

array_map(function($status) use(&$retVal) { 
  $retVal['all'][] = [
    'label' => strtoupper($status['status']),
    'value' => $status['status_id'],
  ]; 
  
  if(empty($status['type'])) return;
  
  $retVal[strtolower($status['type'])][] = [
    'label' => strtoupper($status['status']),
    'value' => $status['status_id'],
  ];

}, $result);

mysqli_close($con);


echo json_encode($retVal);