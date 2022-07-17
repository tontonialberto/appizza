<?php

// Dato l'id di un utente, restituisce il suo
// indirizzo email.
function getUserEmail($user_id, $mysqli)
{
    $result = array(
        "success" => false,
        "error" => "Empty parameters",
        "response" => NULL
    );

    if(isset($user_id, $mysqli))
    {
        $email = $mysqli->query("SELECT email FROM tab_utenti WHERE ID_utente = CAST($user_id AS DECIMAL)");
        
        if(!$email)
        {
            $result["error"] = "Query error: ".$mysqli->error;
        }
        else
        {
            $result["success"] = true;
            $result["error"] = false;
            $email->num_rows    ? $result["response"] = $email->fetch_array(MYSQLI_ASSOC)["email"]
                                : $result["response"] = NULL;
        }
    }
    return $result;
}


###########################################################
###########################################################
###########################################################
###########################################################


function sendOrderMail($to, $customer, $item)
{
    $item_name = $item["nome"];
    $item_quantity = $item["quantita"];

    $body = "
        <html>
            <head>
                <title>Ordine Pizza</title>
            </head>
            <body>
                Hai ricevuto un ordine da $customer
                <hr />
                <table style='border: 1px radius black'>
                    <tr>
                        <th>Nome prodotto</th>
                        <th>Quantita'</th>
                    </tr>
                    <tr>
                        <td>$item_name</td>
                        <td>$item_quantity</td>
                    </th>
                </table>
            </body>
        </html>";
    
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=iso-8859-1',
        'From: APPizza appizza@altervista.org'
    );

    return mail($to, "Ordine Pizza", $body, implode("\r\n", $headers)) ? true : false;
}


###########################################################
###########################################################
###########################################################
###########################################################


// Dato un array associativo contenente i vari prodotti ordinati e relative quantità,
// oltre all'id dell'ordine presente nel database,
// salva tutte le quantità all'interno del database.
function storeQuantities($items, $order_id, $ordered_by, $mysqli)
{
    $result = array(
        "success" => false,
        "error" => "Function storeQuantities(): undefined error"
    );

    $query_store = "
        INSERT INTO tab_quantita_ordinate(id_ordine, id_classe, id_pizza, quantita)
        VALUES(?, (SELECT ID_utente FROM tab_utenti WHERE classe = ?), (SELECT ID_pizza FROM tab_pizze WHERE nome = ? AND id_venditore = ?), ?)";
    $stmt_store = $mysqli->prepare($query_store);

    if(!$stmt_store)
    {
        $result["error"] = "Function storeQuantities(): Preparing statement error: ".$mysqli->error;
    }
    else
    {
        foreach($items as $product)
        {
            $stmt_store->bind_param("issii", 
                $order_id,
                $ordered_by,
                $product["nome"],
                $product["idVenditore"],
                $product["quantita"]
            );

            if(!$stmt_store)
            {
                $result["error"] = "Function storeQuantities(): Binding params error: ".$stmt_store->error;
            }
            else
            {
                $result_store = $stmt_store->execute();

                if(!$result_store)
                {
                    $result["error"] = "Function storeQuantities(): Statement execution error: ".$stmt_store->error;
                    break;
                }
                else
                {
                    $result["success"] = true;
                    $result["error"] = false;
                }
            }
        }
    }

    return $result;
}
