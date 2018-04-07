
<?php

$http_origin = "http://".$_SERVER['HTTP_HOST'];


    header("Access-Control-Allow-Origin: $http_origin");
    header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
		
    




?>