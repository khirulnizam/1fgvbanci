<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		
// http://192.168.0.101/training/1fgv1nsert.php localhost
// http://khirulnizam.com/training/1nsert1orang.php online
// benarkan access dari ionic client
include "connect.php";

	//capture JSON data from IONIC form
	$_POST = json_decode(file_get_contents('php://input'), true);
	
	//sql to insert new record to table orangasal
	$query="INSERT IGNORE INTO bancipokok
	(nopokok,biltandan,catatan) VALUES 
    ('".$_POST['nopokok']."','".$_POST['biltandan'].
	"','".$_POST['catatan']."')";
	//echo $query;
    //run  query
    if(mysqli_query($db, $query)){
		//return as respond
        echo ('{"success":1}');
    }
	else{
		//fail as returned respond
		echo ('{"success":0}');
	}
?>