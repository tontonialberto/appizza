<?php
    include "../config/db_config.php";
    include "../lib/token_verify.php";

    header('Access-Control-Allow-Origin: *');

    $api_result = array
    (
        "success" => false,
        "error" => "Empty request"
    );

    $error_happened = false;

    if(!isset(
        $_POST["token"],
        $_POST["username"],
        $_POST["password"],
        $_POST["email"],
        $_POST["userlevel"],
        $_POST["classe"],
        $_POST["nome"],
        $_POST["cognome"],
        $_POST["citta"])) {
            $error_happened = true;
    }

    if(!$error_happened) {
        $auth_result = token_verify($_POST["token"]);

        if(!$auth_result["success"] || !$auth_result["isAdmin"]) {
            $api_result["error"] = "Error: you cannot create new users";
            $error_happened = true;
        }
    }

    $mysqli = null;
    if(!$error_happened) {
        $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

        if($mysqli->connect_error) {
            $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
            $error_happened = true;
        }
    }

    if(!$error_happened) {
        $query_insert_user = "INSERT INTO tab_utenti VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt_insert_user = $mysqli->prepare($query_insert_user);

        if(!$stmt_insert_user) {
            $api_result["error"] = "Statement prepare error: ".$mysqli->error;
            $error_happened = true;
        }
    }
            
    if(!$error_happened) {
        $ID_utente = NULL;
        
        if($_POST["classe"] == "NO") $_POST["classe"] = NULL;
        if($_POST["citta"] == "NO") $_POST["citta"] = NULL;

        $stmt_insert_user->bind_param("isssissss", 
            $ID_utente,
            $_POST["username"],
            password_hash($_POST["password"], PASSWORD_DEFAULT),
            $_POST["email"],
            $_POST["userlevel"],
            $_POST["classe"],
            $_POST["nome"],
            $_POST["cognome"],
            $_POST["citta"]);

        if(!$stmt_insert_user) 
            $api_result["error"] = "Statement error in binding params: ".$mysqli->error;
        else 
        {
            try {
                $result_insert_user = $stmt_insert_user->execute();
                $api_result["success"] = true;
                $api_result["error"] = NULL;
            }
            catch(Exception $e) {
                $api_result["error"] = "Statement execute error: ".$e->getMessage();
            }
            $stmt_insert_user->close();
        }
    } 
        
    if(null !== $mysqli) {
        $mysqli->close();
    }

    echo json_encode($api_result);
?>