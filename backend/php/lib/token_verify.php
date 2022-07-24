<?php
    require_once "jwt_helper.php";
    require_once __DIR__."/../config/jwt_config.php";
    require_once __DIR__."/../config/db_config.php";

    function token_verify($token)
    {
        global $jwt_server_key, $db_name, $db_server, $db_username, $db_password;

        // Questo array associativo verrà restituito come risultato della funzione.
        // success(boolean) = l'autenticazione ha avuto successo
        // error(string) = la stringa contenente la causa dell'errore
        // isAdmin(boolean) = l'utente autenticato ha privilegi di amministratore
        $api_result = array(
            "success" => false,
            "error" => "Function token_verify() -> Empty Request",
            "isAdmin" => false,
            "userlevel" => NULL,
            "username" => NULL,
            "classe" => NULL
        );

        if(isset($token))
        {
            $user_data = null;
            try {
                // Decodifica il token utilizzando la chiave privata del server.
                $user_data = JWT::decode($token, $jwt_server_key);
                // var_dump($user_data);
    
                // A questo punto, se il token non è valido, lo script va in errore
                // causando un'eccezione di tipo Fatal Error.
                // Se il token è valido, $user_data conterrà un oggetto stdClass.
            }
            catch(UnexpectedValueException $e) {
                $api_result["error"] = "Function token_verify() -> ".$e->getMessage();
            }

            // Nel caso in cui il token sia valido, procede con la verifica
            // delle credenziali all'interno del database
            if($user_data !== null)
            {
                $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

                if($mysqli->connect_error)
                {
                    $api_result["error"] = "Database connection error: ".$mysqli->connect_error;
                }
                else
                {
                    // Creazione e preparazione della query
                    $query_authentication = "
                        SELECT userlevel, classe
                        FROM tab_utenti
                        WHERE username = ?
                        AND userlevel = ?";

                    $stmt_authentication = $mysqli->prepare($query_authentication);

                    if(!$stmt_authentication)
                    {
                        $api_result["error"] = "Query Error: ".$mysqli->error;
                    }
                    else
                    {
                        // La query di autenticazione utilizza le proprietà dell'oggetto stdClass
                        // restituito dalla decodifica del token.
                        $stmt_authentication->bind_param("si", 
                            $user_data->username, 
                            $user_data->userlevel);

                        if(!$stmt_authentication)
                        {
                            $api_result["error"] = "Error in binding params: ".$stmt_authentication->error;
                        }
                        else
                        {
                            if(!$stmt_authentication->execute())
                            {
                                $api_result["error"] = "Statement execution error: ".$stmt_authentication->error;
                            }
                            else
                            {
                                $result_authentication = $stmt_authentication->get_result();

                                if(!$result_authentication->num_rows)
                                {
                                    $api_result["error"] = "Authentication failed: wrong data";
                                }
                                else
                                {
                                    $row_user = $result_authentication->fetch_array();
                                    $userlevel = $row_user["userlevel"];
                                    $classe = $row_user["classe"];

                                    $api_result["success"] = true;
                                    $api_result["error"] = false; 
                                    $api_result["userlevel"] = $userlevel;
                                    $api_result["username"] = $user_data->username;
                                    $api_result["classe"] = $classe;

                                    // Verifica che l'userlevel ottenuto dalla query sia == 2, ovvero admin level
                                    $userlevel == 2 ? $api_result["isAdmin"] = true : $api_result["isAdmin"] = false;
                                }
                            }
                        }
                    }
                }
                $mysqli->close();
            }
        }

    return $api_result;
    }
?>