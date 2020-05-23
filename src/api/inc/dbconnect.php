<?php
$dbaddr="localhost:8889";
$dbuser="root";
$dbpass="root";
$dbname="breakpirates";

$db=mysql_connect($dbaddr,$dbuser,$dbpass);
if($db) {
	mysql_select_db($dbname);
	}

?>
