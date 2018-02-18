<?php
include("connect.php");

$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

$status_id = $_GET['status_id'];
$comment = trim($_GET['comment']);
$order_id = $_GET['orderid'];
$tracking_id = $_GET['trackingid'];

$update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = '{$status_id}' where trackingid='{$tracking_id}'";
$update_parking_order = "UPDATE parking_order SET com = '{$comment}' where orderid='{$order_id}'";

$is_update_parking_tracking1_no_err = mysql_query($update_parking_tracking1);
$is_update_parking_order_no_err = mysql_query($update_parking_order);

if ($is_update_parking_tracking1_no_err && $is_update_parking_order_no_err) {
  $retVal['msg'] = 'data update success!';
  $retVal['error'] = false;
} else {
  $retVal['msg'] = 'mysql err: ' . mysql_error();
  $retVal['error'] = true;
}

mysql_close($con);

echo json_encode($retVal);