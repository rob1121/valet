<?php
include("connect.php");

$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

$table1 = "parking_tracking1";
$table2 = "parking_order";
$sqlLeftJoin = "{$table1} LEFT JOIN {$table2} ON {$table1}.orderid = {$table2}.orderid";

$sql = sprintf(
  "select * from %s where {$table1}.driver='%s' and {$table1}.status_id <> %d and {$table1}.status_id <> %d",
  $sqlLeftJoin,
  $post["driver"],
  REQUEST_COMPLETED,
  REQUEST_ERROR
);

$retVal = [];
$has_active_task = false;
$index = -1;
$res = mysql_query($sql);
while($row = mysql_fetch_array($res)) {
  $retVal[] = [
      'driver' => $row['driver'],
      'status_id' => $row['status_id'],
      'opt' => $row['opt'],
      'ticketno' => $row['ticketno'],
      'requestor' => $row['name'],
      'comment' => $row['com'],
      'orderid' => $row['orderid'],
      'trackingid' => $row['trackingid'],
      'active' => $row['active'],
    ];

    if($has_active_task == false) {
      $has_active_task = ($row['active'] === '1');
      $index++;
    }
}
mysql_close($con);

echo json_encode([
  'has_active_task' => $has_active_task,
  'active_task' => $has_active_task ? $retVal[$index] : [],
  'task_list' => $retVal
]);