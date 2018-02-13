<?php

die(var_dump($_POST));

include("connect.php");
$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

if (!empty($_GET)) {
  $sql = sprintf(
    "UPDATE %s SET token = %s where username='%s' and password='%s' and activation='%s'",
    $addmem,
    $_GET["token"],
    $_GET["username"],
    $_GET["password"],
    "ACTIVE"
  );

  $res = mysqli_query($con, $sql);
  if (mysqli_num_rows($res) > 0) {
    $retVal['data'] = mysqli_fetch_array($res, MYSQLI_ASSOC);
    $retVal['msg'] = 'login success!';
    $retVal['error'] = false;
  } else {
    $retVal['data'] = [];
    $retVal['msg'] = 'login failed!';
    $retVal['error'] = true;
  }
}

mysqli_close($con);


echo json_encode($retVal);