<?php
$fileName = "./stream.pls";
$fp = fopen($fileName,"r");
$contents = fread($fp,filesize($fileName));

header("Content-Type: audio/x-scpls");
header("Content-Disposition: filename=stream.pls");

echo $contents;
?>
