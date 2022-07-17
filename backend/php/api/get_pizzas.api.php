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
        else
        {
            $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

            if($mysqli->connect_error)
            {
                $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
            }
            else
            {
                $query_pizzas = "
                    SELECT  p.nome AS nomePizza,
                            p.prezzo AS prezzo,
                            p.disponibile AS disponibile,
                            p.descrizione AS descrizione,
                            p.foto AS foto,
                            u.ID_utente AS idVenditore,
                            u.nome AS nomeVenditore,
                            u.cognome AS cognomeVenditore,
                            u.citta as citta
                    FROM tab_pizze p JOIN tab_utenti u
                    ON p.id_venditore = u.ID_utente";
                
                $pizzas = $mysqli->query($query_pizzas);

                $api_result["success"] = true;
                $api_result["error"] = false;
                $api_result["response"] = $pizzas->fetch_all(MYSQLI_ASSOC);
            }
        }
    }

    echo json_encode($api_result);
?>
