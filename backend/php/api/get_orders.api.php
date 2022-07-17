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

// Dato un token, restituisce tutti gli ordini relativi all'utente a cui il token appartiene.
// Se l'utente in questione è un venditore, restituisce tutti gli ordini a lui commissionati,
// se è una classe, restituisce tutti gli ordini che ha effettuato verso i vari venditori.

if(isset($_POST["token"]))
{
    $auth_result = token_verify($_POST["token"]);
    
    if(!$auth_result["success"])
    {
        $api_result["error"] = "Authentication unsuccessful ".$auth_result["error"];
    }
    else if($auth_result["isAdmin"])
    {
        $api_result["error"] = "Sei un amministratore, non possiedi uno storico ordini.";
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
            $username = $auth_result["username"];
            $userlevel = $auth_result["userlevel"];

            $query_orders = "";

            // Se è un venditore, restituisce tutti gli ordini che gli sono stati commissionati
            if($userlevel == 1)
            {
                $query_orders = "
                    SELECT  o.ID_ordine AS id,
                            o.data_effettuato AS dataEffettuato,
                            o.stato,
                            p.nome AS pizza,
                            p.prezzo,
                            q.quantita,
                            u2.classe AS classe
                    FROM (((tab_ordini o JOIN tab_quantita_ordinate q ON o.ID_ordine = q.id_ordine)
                    JOIN tab_pizze p ON p.ID_pizza = q.id_pizza)
                    JOIN tab_utenti u ON u.ID_utente = p.id_venditore)
                    JOIN tab_utenti u2 ON u2.ID_utente = q.id_classe
                    WHERE u.username = '$username'";
            }
            // Se è una classe, restituisce tutti gli ordini che ha commissionato ai vari venditori
            else if($userlevel == 0)
            {
                $query_orders = "
                    SELECT  o.ID_ordine AS id,
                            o.data_effettuato AS dataEffettuato,
                            o.stato,
                            p.nome AS pizza,
                            p.prezzo,
                            q.quantita,
                            u.username AS venditore,
                            u.citta
                    FROM (((tab_ordini o JOIN tab_quantita_ordinate q ON o.ID_ordine = q.id_ordine)
                    JOIN tab_pizze p ON p.ID_pizza = q.id_pizza)
                    JOIN tab_utenti u ON u.ID_utente = p.id_venditore)
                    JOIN tab_utenti u2 ON u2.ID_utente = q.id_classe
                    WHERE u2.username = '$username'
                    ORDER BY o.ID_ordine";
            }

            $result_orders = $mysqli->query($query_orders);

            if(!$result_orders)
            {
                $api_result["error"] = "Query error: ".$mysqli->error;
            }
            else
            {
                $api_result["success"] = true;
                $api_result["error"] = false;
                $api_result["response"] = $result_orders->fetch_all(MYSQLI_ASSOC);
            }
        }
    }
}

echo json_encode($api_result);
?>
