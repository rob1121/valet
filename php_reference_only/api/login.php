<?php
include("connect.php");
$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

if(!empty($_POST))
{
	$sta="ACTIVE";
	$sql = "select * from ".$addmem." where username='".$_POST["username"]."' and password='".$_POST["password"]."' and activation='".$sta."'";
  
  $res = mysqli_query($con, $sql);
  if(mysql_num_rows($res)>0)
  {
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