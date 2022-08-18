<?php
// http://192.168.1.104/training/1nsert1orang.php localhost
// http://khirulnizam.com/training/1nsert1orang.php online
// benarkan access dari ionic client
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include "connect.php";

	//capture JSON data from IONIC form
	$array = json_decode(file_get_contents('php://input'), true); //Convert JSON String into PHP Array
	foreach($array as $row) //Extract the Array Values by using Foreach Loop
	{
	 $query =$query. "INSERT IGNORE INTO bancipokok(nopokok, biltandan,catatan) 
	 VALUES ('".$row["nopokok"]."', '".$row["biltandan"]."', '".$row["catatan"]."');";  // Make Multiple Insert Query 

	}
	//echo $query;
    //run  query
    if(mysqli_multi_query($db, $query)){
		//return as respond
        echo ("{\"success\":1}");
    }
	else{
		//fail as returned respond
		echo ("{\"success\":0}");
	}
?>