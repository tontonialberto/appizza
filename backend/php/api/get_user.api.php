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
    
    if(isset($_POST["token"], $_POST["username"]))
    {
        $auth_result = token_verify($_POST["token"]);
		
        if(!$auth_result["success"])
        {
        	$api_result["error"] = "Authentication unsuccessful ".$auth_result["error"];
        }
        else if(!$auth_result["isAdmin"])
        {
        	$api_result["error"] = "Error: You are not an admin, your userlevel is ".$auth_result["userlevel"]." so you can't access to this content";
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
                $stmt_user = $mysqli->prepare("SELECT * FROM tab_utenti WHERE username = ?");

                if(!$stmt_user)
                {
                    $api_result["error"] = "Error in preparing statement: ".$mysqli->error;
                }
                else
                {
                    $stmt_user->bind_param("s", $_POST["username"]);

                    if(!$stmt_user)
                    {
                        $api_result["error"] = "Error in binding params: ".$stmt_user->error;
                    }
                    else
                    {
                        if(!$stmt_user->execute())
                        {
                            $api_result["error"] = "Statement execution error: ".$result_user->error;
                        }
                        else
                        {
                            $result_user = $stmt_user->get_result();

                            if(!$result_user->num_rows)
                            {
                                $api_result["error"] = "Error: User ".$_POST["username"]." does not exist";
                            }
                            else
                            {
                                $row_user = $result_user->fetch_array(MYSQLI_ASSOC);

                                $api_result["success"] = true;
                                $api_result["error"] = false;
                                $api_result["response"] = $row_user;
                            }
                        }
                    }
                }
            }
        }
    }

    echo json_encode($api_result);
?>
