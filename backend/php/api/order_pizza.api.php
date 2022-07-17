<?php
include "../config/db_config.php";
include "../lib/token_verify.php";
include "../lib/my_functions.php";

header('Access-Control-Allow-Origin: *');

$api_result = array
(
    "success" => false,
    "error" => "Empty request"
);

$request = json_decode($_POST["request"], true);

if(isset($request["token"], $request["shoppingItems"]))
{
    $auth_result = token_verify($request["token"]);
    
    if(!$auth_result["success"])
    {
        $api_result["error"] = "Authentication unsuccessful ".$auth_result["error"];
    }
    // Controlla che sia una classe ad effettuare l'ordine
    else if($auth_result["userlevel"] != 0)
    {
        $api_result["error"] = "Errore nell'ordine: non sei uno studente, quindi non puoi ordinare la pizza";
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
            /* Aggiunge l'ordine e le quantità nel database */
            // Inserimento nuovo ordine
            $query_new_order = "
                INSERT INTO tab_ordini(ID_ordine, data_effettuato, data_consegna, stato)
                VALUES(NULL, CURRENT_TIMESTAMP, NULL, 'Da consegnare')";
            
            $result_new_order = $mysqli->query($query_new_order);

            if(!$result_new_order)
            {
                $api_result["error"] = "Creating new order -> Query Error: ".$mysqli->error;
            }
            else
            {
                $items = $request["shoppingItems"];

                // Inserimento di tutte le quantità ordinate
                $ID_ordine = $mysqli->insert_id;
                $result_store = storeQuantities($items, $ID_ordine, $auth_result["classe"], $mysqli);

                if(!$result_store["success"])
                {
                    $api_result["error"] = $result_store["error"];
                }
                else
                {
                    /* Seleziona l'email dei venditori dal database ed invia loro una o più mail */            
                    foreach($items as $item)
                    {
                        $vendorEmail = getUserEmail($item["idVenditore"], $mysqli);
                        $item["emailVenditore"] = $vendorEmail["response"];

                        sendOrderMail($item["emailVenditore"], $auth_result["username"], $item);
                    }

                    $api_result["success"] = true;
                    $api_result["error"] = false;
                }
            }
        }
    }
}

echo json_encode($api_result);
