<?php
include("connect.php");

$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

$table1 = "parking_tracking1";
$table2 = "parking_order";
$sqlLeftJoin = "{$table1} LEFT JOIN {$table2} ON {$table1}.orderid = {$table2}.orderid";

$sql = sprintf(
  "select * from %s where {$table1}.driver='%s' and {$table1}.status_id <> %d and {$table1}.status_id <> %d",
  $sqlLeftJoin,
  $_GET["driver"],
  REQUEST_COMPLETED,
  REQUEST_ERROR
);

$res = mysqli_query($con, $sql);
if (mysqli_num_rows($res) > 0) {
  $tracks = array_map(function ($track) {
    return [
      'driver' => $track['driver'],
      'status_id' => $track['status_id'],
      'opt' => $track['opt'],
      'ticketno' => $track['ticketno'],
      'requestor' => $track['name'],
      'comment' => $track['com'],
      'orderid' => $track['orderid'],
      'trackingid' => $track['trackingid'],
    ];
  }, mysqli_fetch_all($res, MYSQLI_ASSOC));

  $retVal['data'] = $tracks;
  $retVal['msg'] = 'success!';
  $retVal['error'] = false;
} else {
  $retVal['data'] = [];
  $retVal['msg'] = 'failed!';
  $retVal['error'] = true;
}

mysqli_close($con);


echo json_encode($retVal);