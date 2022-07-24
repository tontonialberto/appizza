<?php
    include "../config/db_config.php";
    include "../lib/token_verify.php";

    header("Access-Control-Allow-Origin: *");

    $api_result = array(
        "success" => false,
        "error" => "Empty request"
    );

    if(isset(   $_POST["token"], 
                $_POST["usernameToDelete"]))
    {
        $auth_result = token_verify($_POST["token"]);

        if(!$auth_result["success"])
        {
            $api_result["error"] = "Authentication error".$auth_result["error"];
        }
        else if(!$auth_result["isAdmin"])
        {
            $api_result["error"] = "Error: your are not an admin, your userlevel is 2, so you can't delete users";
        }
        else
        {
            $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

            if($mysqli->connect_error)
            {
                $api_result["error"] = "DB connection error: ".$mysqli->connect_error;
            }
            else
            {
                $query_delete_user = "
                    DELETE FROM tab_utenti
                    WHERE username = ?";
                
                $stmt_delete_user = $mysqli->prepare($query_delete_user);

                if(!$stmt_delete_user)
                {
                    $api_result["error"] = "Statement prepare error: ".$mysqli->error;
                }
                else
                {
                    if(!$stmt_delete_user->bind_param("s", $_POST["usernameToDelete"]))
                    {
                        $api_result["error"] = "Statement error in binding params: ".$mysqli->error;
                    }
                    else
                    {
                        if(!$stmt_delete_user->execute()) {
                            $api_result["error"] = "Statement execution error: ".$mysqli->error;
                        }
                        else if(0 === $stmt_delete_user->affected_rows) {
                            $api_result["error"] = "User does not exist";
                        } 
                        else {
                            $api_result["success"] = true;
                            $api_result["error"] = false;
                        }
                    }
                    $stmt_delete_user->close();
                }
            }

            $mysqli->close();
        }
    }
    echo json_encode($api_result);
?>