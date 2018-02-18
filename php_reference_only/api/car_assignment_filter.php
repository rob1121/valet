<?php
include('connect.php');

$retVal = [
  'all' => [],
  'pickup' => [],
  'delivery' => [],
];

$sql = sprintf('select * from %s where status_id <> %d and status_id <> %d',
  'parking_status',
  REQUEST_COMPLETED,
  REQUEST_ERROR
);

$result = mysql_query($sql);
while($row = mysql_fetch_array($result)) {
  $retVal['all'][] = [
    'label' => strtoupper($row['status']),
    'value' => $row['status_id'],
  ]; 
  
  if(empty($row['type'])) next;
  
  $retVal[strtolower($row['type'])][] = [
    'label' => strtoupper($row['status']),
    'value' => $row['status_id'],
  ];
}

mysql_close($con);


echo json_encode($retVal);