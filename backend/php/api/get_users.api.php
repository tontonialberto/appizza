<?php
    include "../config/db_config.php";
    include "../lib/token_verify.php";

    header('Access-Control-Allow-Origin: *');

    $api_result = array
    (
        "success" => false,
        "error" => "Empty request",
        "response" => NULL
    );
    
    if(isset($_POST["token"]))
    {
        $auth_result = token_verify($_POST["token"]);
		
        if(!$auth_result["success"])
        {
        	$api_result["error"] = "Authentication unsuccessful ".$auth_result["error"];
        }
        else if(!$auth_result["isAdmin"])
        {
            $api_result["error"] = "You have too few privileges to get users data, your userlevel is ".$auth_result["userlevel"];
        }
        else
        {
            $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

            if($mysqli->connect_error)
            {
                $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
            }
            else
            {
                $users = $mysqli->query("SELECT * FROM tab_utenti");

                $api_result["success"] = true;
                $api_result["error"] = false;
                $api_result["response"] = $users->fetch_all(MYSQLI_ASSOC);
            }
        }
    }

    echo json_encode($api_result);
?>
