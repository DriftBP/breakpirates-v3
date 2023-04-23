<?php
$dbaddr="localhost:8889";
$dbuser="root";
$dbpass="root";
$dbname="breakpirates";

$db=mysqli_connect($dbaddr,$dbuser,$dbpass,$dbname);
if(!$db) {
	echo "Can't connect to DB";
	}

?>
