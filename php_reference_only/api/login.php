<?php
include("connect.php");
$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

$json = file_get_contents('php://input');
$post = json_decode($json, TRUE);

if(!empty($post))
{
  $sql = sprintf(
    "select * from %s where username='%s' and password='%s' and activation='%s'",
    $addmem,
    $post["username"],
    $post["password"],
    "ACTIVE"
  );
   
  $res = mysqli_query($con, $sql);
  if(mysqli_num_rows($res)>0)
  {
    $sql = sprintf(
      "UPDATE %s SET token='%s' WHERE username='%s' AND password='%s' AND activation='%s'",
      $addmem,
      $post["token"],
      $post["username"],
      $post["password"],
      "ACTIVE"
    );
     
    mysqli_query($con, $sql);

    $retVal['data'] = mysqli_fetch_array($res, MYSQLI_ASSOC);
    $retVal['msg'] = 'login success!';
    $retVal['error'] = false;
  }
	else
	{
    $retVal['data'] = [];
    $retVal['msg'] = 'login failed!';
    $retVal['error'] = true;
	}
}

mysqli_close($con);


echo json_encode($retVal);