<?php
require_once("connect.php");
require_once('utilities.php');


$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];


$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

$active = $post['active'];
$status_id = $post['status_id'];
$order_id = $post['orderid'];
$opt = $post['opt'];
$tracking_id = $post['trackingid'];
$date = date("m\d\Y");
$time = date("h:i:s A");
$is_update_parking_tracking1_no_err=true;
$is_update_parking_order_no_err=true;


if($active == ACTIVE) {
  if($status_id == ASSIGN_DRIVER && $opt == 'Delivery') {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".VALET_ON_THE_WAY.", vow_date='{$date}', vow_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=1 where orderid={opt}";  
  } elseif($status_id == ASSIGN_DRIVER && $opt == 'Delivery') {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".VEHICLE_ON_THE_WAY.", left_garage_date='{$date}', left_garage_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=1 where orderid={opt}";  
  } elseif($status_id == VALET_ON_THE_WAY) {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".ARRIVED_AT_THE_GARAGE.", vow_date='{$date}', vow_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=1 where orderid={$order_id}";  
  } elseif($status_id == ARRIVED_AT_THE_GARAGE) {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".TASK_COMPLETED.", garage_arrival_date='{$date}', garage_arrival_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=0 where orderid={$order_id}";  
  } elseif($status_id == VEHICLE_ON_THE_WAY) {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".REQUEST_COMPLETED.", left_garage_date='{$date}', left_garage_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=1 where orderid={$order_id}";  
  } elseif($status_id == REQUEST_COMPLETED) {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".WAITING_DISPATCHER." where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=1 where orderid={$order_id}";  
  } elseif($status_id == WAITING_DISPATCHER) {
    $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".TASK_COMPLETED.", garage_arrival_date='{$date}', garage_arrival_time='{$time}' where trackingid={$tracking_id}";
    $update_parking_order = "UPDATE parking_order SET active=0 where orderid={$order_id}";  
  }

	$is_update_parking_tracking1_no_err = mysql_query($update_parking_tracking1);
	$is_update_parking_order_no_err = mysql_query($update_parking_order);
} else {
  If($status_id == ASSIGN_DRIVER) {
    if($opt == 'Pickup') {
      $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".VALET_ON_THE_WAY.", vow_date='{$date}', vow_time='{$time}' where trackingid={$tracking_id}"; 
    }
    if($opt == 'Delivery') {
      $update_parking_tracking1 = "UPDATE parking_tracking1 SET status_id = ".VALET_ON_THE_WAY.", vow_date='{$date}', vow_time='{$time}' where trackingid={$tracking_id}";
    }
    $is_update_parking_tracking1_no_err = mysql_query($update_parking_tracking1);
  }

  $update_parking_order = "UPDATE parking_order SET active=1 where orderid={$order_id}";

	$is_update_parking_order_no_err = mysql_query($update_parking_order);
}


if (!$is_update_parking_tracking1_no_err || !$is_update_parking_order_no_err) {
  die('mysql err: ' . mysql_error());
}

echo json_encode(getTask($post['driver']));
mysql_close($con);