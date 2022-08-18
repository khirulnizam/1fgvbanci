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

//refURL https://stackoverflow.com/questions/51703662/php-insert-multiple-records-into-mysql-from-one-json-string
//https://www.webslesson.info/2016/04/get-multiple-json-data-insert-into-mysql-database-in-php.html

	//capture JSON data from IONIC form
          $array = json_decode(file_get_contents('php://input'), true); //Convert JSON String into PHP Array
          foreach($array as $row) //Extract the Array Values by using Foreach Loop
          {
           $query .= "INSERT IGNORE INTO fgvusertable(name, email) 
		   VALUES ('".$row["name"]."', '".$row["email"]."'); ";  // Make Multiple Insert Query 

          }
          if(mysqli_multi_query($db, $query)){
			  echo "{\"success\":1}";
		  }else{
			  echo "{\"success\":0}";
		  }
?>