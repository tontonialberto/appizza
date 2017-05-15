<?php
    require("db_config.php");

    $api_result = array
    (
        "success" => false,
        "error" => "Empty request"
    );

    if(isset(   $_POST["nome_pizza"], 
                $_POST["prezzo"], 
                $_POST["disponibile"], 
                $_POST["id_venditore"], 
                $_POST["descrizione"],
                $_POST["foto"]))
    {
        $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

        if($mysqli->connect_error)
        {
            $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
        }
        else 
        {
            $query_add_pizza = "INSERT INTO tab_pizze VALUES(?, ?, ?, ?, ?, ?, ?)";
            $stmt_add_pizza = $mysqli->prepare($query_add_pizza);

            if(!$stmt_add_pizza)
            {
                $api_result["error"] = "Statement prepare error: ".$mysqli->error;
            }
            else
            {
                $ID_pizza = NULL;
                $URL_foto = "";

                $stmt_add_pizza->bind_param("isdiiss",
                    $ID_pizza,
                    $_POST["nome_pizza"],
                    $_POST["prezzo"],
                    $_POST["disponibile"],
                    $_POST["id_venditore"],
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
                        $api_result["error"] = NULL;
                    }
                    $stmt_add_pizza->close();
                }
            }
        }
        $mysqli->close();
    }

    echo json_encode($api_result);
?>