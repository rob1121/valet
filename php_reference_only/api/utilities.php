<?php
require_once("connect.php");

define('ACTIVE', 1);
define('VALET_ON_THE_WAY', 2);
define('ARRIVED_AT_THE_GARAGE', 3);
define('VEHICLE_ON_THE_WAY', 4);
define('REQUEST_COMPLETED', 5);
define('REQUEST_ERROR', 6);
define('ASSIGN_DRIVER', 7);
define('TASK_COMPLETED', 8);
define('WAITING_DISPATCHER', 9);

function status() {
  $sql = 'SELECT * FROM parking_status';
  $res = mysql_query($sql);
  $retVal = [];
  while($status = mysql_fetch_array($res)) {
    $retVal[$status['status_id']] = $status['status'];
  }

  return $retVal;
}

function getTask($driver) {
  
  $table1 = "parking_tracking1";
  $table2 = "parking_order";
  $sqlLeftJoin = "{$table1} LEFT JOIN {$table2} ON {$table1}.orderid = {$table2}.orderid";

  $sql = sprintf(
    "select * from %s where {$table1}.driver='%s' and {$table1}.status_id <> %d and {$table1}.status_id <> %d",
    $sqlLeftJoin,
    $driver,
    TASK_COMPLETED,
    REQUEST_ERROR
  );

  $retVal = [];
  $has_active_task = false;
  $index = -1;
  $res = mysql_query($sql);
  $statuses = status();

  while($row = mysql_fetch_array($res)) {
    $retVal[] = [
      'driver' => $row['driver'],
      'status_id' => (int)$row['status_id'],
      'status_title' => $statuses[$row['status_id']],
      'opt' => $row['opt'],
      'ticketno' => $row['ticketno'],
      'requestor' => $row['name'],
      'comment' => $row['com'],
      'orderid' => $row['orderid'],
      'trackingid' => $row['trackingid'],
      'active' => (boolean)$row['active'],
    ];

    if($has_active_task == false) {
      $has_active_task = ($row['active'] === '1');
      $index++;
    }
  }

  return [
    'has_active_task' => $has_active_task,
    'active_task' => $has_active_task ? $retVal[$index] : [],
    'task_list' => $retVal
  ];
}
