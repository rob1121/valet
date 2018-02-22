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
   
  $res = mysql_query($sql);
  if(mysql_num_rows($res)>0)
  {
    $user = mysql_fetch_array($res);
    $sql = sprintf(
      "UPDATE %s SET token='%s' WHERE id='%d'",
      $addmem,
      $post["token"],
      $user['id']
    );
     
    mysql_query($sql);

    $retVal['data'] = $user;
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

mysql_close($con);


echo json_encode($retVal);