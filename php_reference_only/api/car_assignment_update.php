<?php
include("connect.php");

$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];


$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

$status_id = $post['status_id'];
$order_id = $post['orderid'];
$tracking_id = $post['trackingid'];
$date = date("m\d\Y");
$time = date("h:i:s A");
$update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = '{$status_id}', vow_date='{$date}', vow_time='{$time}' where trackingid={$tracking_id}";
$update_parking_order = "UPDATE parking_order SET active=1 where orderid={$order_id}";

$is_update_parking_tracking1_no_err = mysql_query($update_parking_tracking1);
$is_update_parking_order_no_err = mysql_query($update_parking_order);

if ($is_update_parking_tracking1_no_err) {
  $retVal['msg'] = 'data update success!';
  $retVal['error'] = false;
} else {
  $retVal['msg'] = 'mysql err: ' . mysql_error();
  $retVal['error'] = true;
}

mysql_close($con);

echo var_dump($retVal);