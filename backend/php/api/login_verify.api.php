<?php
    require "../config/db_config.php";
    require "../lib/jwt_helper.php";
	
    header("Access-Control-Allow-Origin: *");
    
    $api_result = array(
        "success" => false,
        "token" => NULL,
        "error" => "Empty Request"
    );

    if(isset($_POST["username"], $_POST["password"]))
    {
        $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

        if($mysqli->connect_error) 
        {
            $api_result["error"] = "Database connection error: ".$mysqli->connect_error;
        }    
        else 
        {
            $query_login = "SELECT userlevel, password FROM tab_utenti WHERE username = ?";
            $stmt_login = $mysqli->prepare($query_login);

            if(!$stmt_login)
            {
                $api_result["error"] = "Query Error: ".$mysqli->error;
            }
            else 
            {
                $stmt_login->bind_param("s", $_POST["username"]);
                
                if(!$stmt_login)
                {
                    $api_result["error"] = "Errore nel binding dei parametri: ".$stmt_login->error;
                }
                else
                {
                    if(!$stmt_login->execute())
                    {
                        $api_result["error"] = "Errore nell'esecuzione dello statement: ".$stmt_login->error;
                    }
                    else
                    {
                        $result_login = $stmt_login->get_result();
                        if(!$result_login->num_rows)
                        {
                            $api_result["error"] = "Errore: username errato";
                        }
                        else
                        {
                            $user_row = $result_login->fetch_array();
                            
                            if(!password_verify($_POST["password"], $user_row["password"]))
                            {
                            	$api_result["error"] = "Errore: password errata";
                            }
                            else
                            {
                            	$userlevel = $user_row["userlevel"];

                                $userData = array(
                                    "username" => $_POST["username"],
                                    "userlevel" => $userlevel
                                );

                                $token = JWT::encode($userData, $jwt_server_key);

                                $api_result["success"] = true;
                                $api_result["token"] = $token;
                                $api_result["error"] = NULL;
                            }
                        }
                    }
                }
            }
        }
        $mysqli->close();
    }

    echo json_encode($api_result);
?>