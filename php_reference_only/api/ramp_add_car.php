<?php
include("connect.php");
$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

/** get last parking_order */
function get_last_parking_order() {
  $sql = "SELECT * from parking_order ORDER BY DESC LIMIT 1";

  $res = mysql_query($sql);
  return mysql_fetch_array($res);
}

/** add data to parking_order */
function add_parking_order($post) {  
  $sql = "INSERT INTO parking_order ";
  $sql .= "(uid, name, opt, ticketno, car_plate_no, car_make, car_model) ";
  $sql .= "VALUES('{$post['uid']}', '{$post['name']}', '{$post['opt']}', '{$post['ticketno']}',  '{$post['car_plate_no']}', '{$post['car_make']}',  '{$post['car_model']}')";

  mysql_query($sql);
}

/** add data to parking_track1 */
function add_parking_track1($post) {
  $parking_order = get_last_parking_order();

  $sql = "INSERT INTO parking_track1 (orderid) VALUES('{$parking_order['orderid']}')";

  mysql_query($sql);
}

/** add data to parking_transient */
function add_parking_transient($post) {
  $parking_order = get_last_parking_order();

  $sql = "INSERT INTO parking_transient ";
  $sql .= "(orderid, customercontactno) ";
  $sql .= "VALUES('{$parking_order['orderid']}', '{$post['customercontactno']}')";

  mysql_query($sql);
}

/** add data to parking_monthly */
function add_parking_monthly($post) {
  $parking_order = get_last_parking_order();

  $sql = "INSERT INTO parking_monthly ";
  $sql .= "(orderid, customercontactno) ";
  $sql .= "VALUES('{$parking_order['orderid']}', '{$post['customercontactno']}')";

  mysql_query($sql);
}

try {
  add_parking_order($post);
  add_parking_track1($post);
  
  if($post['car_category'] === 'transient') {
    add_parking_transient($post);
  } elseif($post['car_category'] === 'monthly') {
    add_parking_monthly($post);
  }
  
  $retVal['error'] = false;
} catch(Exception $e) {
  $retVal['error'] = true;
  $retVal['msg'] = $e->getMessage();
}

echo json_encode($retVal);