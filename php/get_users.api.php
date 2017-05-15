<?php
    require("db_config.php");

    header('Access-Control-Allow-Origin: *');

    $api_result = array
    (
        "success" => false,
        "error" => NULL,
        "response" => NULL
    );

    $mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

    if($mysqli->connect_error)
    {
        $api_result["error"] = "DB connect error: ".$mysqli->connect_error;
    }
    else
    {
        $users = $mysqli->query("SELECT * FROM tab_utenti");

        $api_result["success"] = true;
        $api_result["response"] = $users->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($api_result);
?>