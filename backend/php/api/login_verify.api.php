<?php
    require __DIR__."/../config/db_config.php";
    require __DIR__."/../lib/jwt_helper.php";
    require __DIR__."/../config/jwt_config.php";
	
    header("Access-Control-Allow-Origin: *");
    
    $api_result = array(
        "success" => false,
        "token" => NULL,
        "error" => "Empty Request"
    );

    $error_happened = false;

    if(!isset($_POST["username"], $_POST["password"])) {
        $error_happened = true;
    }

    $mysqli = null;
    if(!$error_happened) {
        $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

        if($mysqli->connect_error) {
            $api_result["error"] = "Database connection error: ".$mysqli->connect_error;
            $error_happened = true;
        }
    }
    
    if(!$error_happened) {
        $query_login = "SELECT userlevel, password FROM tab_utenti WHERE username = ?";
        $stmt_login = $mysqli->prepare($query_login);

        if(!$stmt_login) {
            $api_result["error"] = "Query Error: ".$mysqli->error;
            $error_happened = true;
        }
    }

    if(!$error_happened) {
        if(!$stmt_login->bind_param("s", $_POST["username"])) {
            $api_result["error"] = "Errore nel binding dei parametri: ".$stmt_login->error;
            $error_happened = true;
        }
    }
    
    if(!$error_happened) {
        if(!$stmt_login->execute()) {
            $api_result["error"] = "Errore nell'esecuzione dello statement: ".$stmt_login->error;
            $error_happened = true;
        }
    }
    
    if(!$error_happened) {
        $result_login = $stmt_login->get_result();
        $wrongUsername = (0 == $result_login->num_rows);

        if($wrongUsername) {
            $api_result["error"] = "Wrong username or password";
            $error_happened = true;
        }
    }
    
    if(!$error_happened) {
        $user_row = $result_login->fetch_array();
        
        if(!password_verify($_POST["password"], $user_row["password"])) {
            $api_result["error"] = "Wrong username or password";
            $error_happened = true;
        }
    }
    
    if(!$error_happened) {
        $userlevel = $user_row["userlevel"];

        $userData = array(
            "username" => $_POST["username"],
            "userlevel" => $userlevel
        );

        global $jwt_server_key;
        $token = JWT::encode($userData, $jwt_server_key);

        $api_result["success"] = true;
        $api_result["token"] = $token;
        $api_result["error"] = NULL;
    }

    if(null !== $mysqli) {
        $mysqli->close();
    }

    echo json_encode($api_result);
?>