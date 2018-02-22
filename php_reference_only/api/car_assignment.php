<?php
require_once('utilities.php');

$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);



echo json_encode(getTask($post['driver']));
mysql_close($con);