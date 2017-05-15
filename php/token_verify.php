<?php/*
    function token_verify(token)
    {}*/
    require "../lib/jwt_helper.php";
    require "jwt_config.php";
    require "db_config.php";

    // Questo array associativo verrà restituito come risultato della funzione.
    // success(boolean) = l'autenticazione ha avuto successo
    // error(string) = la stringa contenente la causa dell'errore
    // isAdmin(boolean) = l'utente autenticato ha privilegi di amministratore
    $api_result = array(
        "success" => false,
        "error" => "Empty Request",
        "isAdmin" => false,
        "userlevel" => NULL
    );

    if(isset($_POST["token"]))
    {
        // Decodifica il token utilizzando la chiave privata del server.
        $user_data = JWT::decode($_POST["token"], $jwt_server_key);
        // var_dump($user_data);

        // A questo punto, se il token non è valido, lo script va in errore
        // causando un'eccezione di tipo Fatal Error.
        // Se il token è valido, $user_data conterrà un oggetto stdClass.

        // Nel caso in cui il token sia valido, procede con la verifica
        // delle credenziali all'interno del database
        if(is_object($user_data))
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
                    SELECT userlevel
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
                                $userlevel = $result_authentication->fetch_array();
                                $userlevel = $userlevel["userlevel"];

                                $api_result["success"] = true;
                                $api_result["error"] = false; 
                                $api_result["userlevel"] = $userlevel;

                                // Verifica che l'userlevel ottenuto dalla query sia == 2, ovvero admin level
                                $userlevel == 2 ? $api_result["isAdmin"] = true : $api_result["isAdmin"] = false;
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