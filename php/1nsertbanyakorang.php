<?php
// http://khirulnizam.com/training/1nsertbanyakorang.php
// access dari ionic client
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
    print_r(json_encode($request));
	echo ('{"success":1}');

/*    
include "connect.php";
$jsondata=$_POST['banyakorang'];
//echo $jsondata;

//INSERT IGNORE INTO users_partners (uid,pid) VALUES (1,1),(1,2),(1,3),(1,4)

$array = json_decode($jsondata, true); 
	$query="INSERT IGNORE INTO orangasal(nokp,nama,pendapatan) VALUES ";
	$numItems = count($array);
	$i=1;
    foreach($array as $row) {
    
        // Database query to insert data 
        // into database Make Multiple 
        // Insert Query 
        $query =$query. "('".$row["nokp"]."', '".$row["nama"]."', 
        '".$row["pendapatan"]."') "; 
		//coma or semicolon
		if($numItems==$i){//if last data ; else ,
			$query=$query.";";
		}else{
			$query=$query.",";
		}
		$i++;
    }
	//echo $query;
    //run multiple query
    if(mysqli_multi_query($db, $query)){
        echo ('{"success":1}');
    }
	else{
		echo ('{"success":0}');
	}
    */
?>