<?php

$retVal = [
  'msg' => '',
  'error' => true,
  'data' => [],
];

$target_dir = "../upload/";
$target_file = $target_dir . basename($_FILES["photo"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$check = getimagesize($_FILES["photo"]["tmp_name"]);
if($check === false) {
  $retVal['msg'] .= "File is not an image.";
  $retVal['error'] = true;
}

if (file_exists($target_file)) {
  $retVal['msg'] .= "Sorry, file already exists.";
  $retVal['error'] = true;
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  $retVal['msg'] .= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $retVal['error'] = true;
}

if ($uploadOk == 0) {
  $retVal['msg'] .= "Sorry, your file was not uploaded.";
  $retVal['error'] = true;
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
    $retVal['msg'] .= "The file ". basename( $_FILES["photo"]["name"]). " has been uploaded.";
    $retVal['error'] = false;
    $retVal['data']['location'] = "{$_SERVER['SERVER_NAME']}{$target_file}";
  } else {
    $retVal['msg'] .= "Sorry, there was an error uploading your file.";
    $retVal['error'] = true;
  }
}

echo json_encode($retVal);