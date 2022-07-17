<?php
    include "../config/db_config.php";
    include "../lib/token_verify.php";

    header("Access-Control-Allow-Origin: *");

    $api_result = array(
        "success" => false,
        "error" => "Empty request"
    );

    if(isset(   $_POST["token"], 
                $_POST["pizzaName"]))
    {
        $auth_result = token_verify($_POST["token"]);

        if(!$auth_result["success"])
        {
            $api_result["error"] = "Authentication error".$auth_result["error"];
        }
        else if($auth_result["userlevel"] != 1)
        {
            $api_result["error"] = "Error: you are not a vendor, so you can't add new products";
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
                $query_delete_pizza = "
                    DELETE FROM tab_pizze
                    WHERE nome = ? 
                    AND id_venditore = (SELECT ID_utente FROM tab_utenti WHERE username = ?)";
                
                $stmt_delete_pizza = $mysqli->prepare($query_delete_pizza);

                if(!$stmt_delete_pizza)
                {
                    $api_result["error"] = "Statement prepare error: ".$mysqli->error;
                }
                else
                {
                    $stmt_delete_pizza->bind_param("ss",
                        $_POST["pizzaName"],
                        $auth_result["username"]);
                    
                    if(!$stmt_delete_pizza)
                    {
                        $api_result["error"] = "Statement error in binding params: ".$mysqli->error;
                    }
                    else
                    {
                        $api_result["success"] = true;
                        $api_result["error"] = false;
                    }
                    $stmt_delete_pizza->close();
                }
            }

            $mysqli->close();
        }
    }
    echo json_encode($api_result);
?>