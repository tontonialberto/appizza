<?php
    header("Access-Control-Allow-Origin: *");
    
    require "../lib/jwt_helper.php";
    require "jwt_config.php";
    require "db_config.php";

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
            $query_login = "SELECT userlevel FROM tab_utenti WHERE username = ? AND password = ?";
            $stmt_login = $mysqli->prepare($query_login);

            if(!$stmt_login)
            {
                $api_result["error"] = "Query Error: ".$mysqli->error;
            }
            else 
            {
                $stmt_login->bind_param("ss", $_POST["username"], $_POST["password"]);
                
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
                            $api_result["error"] = "Errore: username o password errati";
                        }
                        else
                        {
                            $userlevel = $result_login->fetch_array();
                            $userlevel = $userlevel["userlevel"];

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
        $mysqli->close();
    }

    echo json_encode($api_result);
?>