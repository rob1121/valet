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
    // $post["username"],
    // $post["password"],
    'alex1',
    '1234.',
    "ACTIVE"
  );
   
  $res = mysql_query($sql);
  if(mysql_num_rows($res)>0)
  {
    $sql = sprintf(
      "UPDATE %s SET token='%s' WHERE username='%s' AND password='%s' AND activation='%s'",
      $addmem,
      $post["token"],
      // $post["username"],
      // $post["password"],
      'alex1',
      '1234.',
      "ACTIVE"
    );
     
    mysql_query($con, $sql);

    $retVal['data'] = mysql_fetch_array($res);
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