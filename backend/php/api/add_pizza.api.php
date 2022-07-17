<?php
    include "../config/db_config.php";
    include "../lib/token_verify.php";
    
    header("Access-Control-Allow-Origin: *");

    $api_result = array
    (
        "success" => false,
        "error" => "Empty request"
    );

    if(isset(   $_POST["token"],
                $_POST["nomepizza"], 
                $_POST["prezzo"], 
                $_POST["disponibile"], 
                $_POST["descrizione"]))
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
                $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
            }
            else 
            {
                $query_add_pizza = "INSERT INTO tab_pizze (ID_pizza, nome, prezzo, disponibile, id_venditore, descrizione, foto)
                    VALUES(?, ?, ?, ?, (SELECT ID_utente FROM tab_utenti WHERE username = ?), ?, ?)";
                $stmt_add_pizza = $mysqli->prepare($query_add_pizza);

                if(!$stmt_add_pizza)
                {
                    $api_result["error"] = "Statement prepare error: ".$mysqli->error;
                }
                else
                {
                    $ID_pizza = NULL;
                    $URL_foto = "";

                    $stmt_add_pizza->bind_param("isdisss",
                        $ID_pizza,
                        $_POST["nomepizza"],
                        $_POST["prezzo"],
                        $_POST["disponibile"],
                        $auth_result["username"],
                        $_POST["descrizione"],
                        $URL_foto
                    );

                    if(!$stmt_add_pizza)
                    {
                        $api_result["error"] = "Statement error in binding params: ".$mysqli->error;
                    }
                    else
                    {
                        $result_add_pizza = $stmt_add_pizza->execute();

                        if(!$result_add_pizza)
                        {
                            $api_result["error"] = "Statement execution error: ".$stmt_add_pizza->error;
                        }
                        else
                        {
                            $api_result["success"] = true;
                            $api_result["error"] = false;
                        }
                        $stmt_add_pizza->close();
                    }
                }
            }
            $mysqli->close();
        }
    }

    echo json_encode($api_result);
?>
