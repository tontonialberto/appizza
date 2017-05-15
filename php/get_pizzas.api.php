<?php
	require("db_config.php");
	require("jwt_config.php");

	$api_result = array
	(
		"success" => false,
		"error" => NULL,
		"response" => NULL
	);

	$mysqli = new mysqli($db_server, $db_username, $db_password, $db_name);

	if(!$mysqli->connect_error)
	{
		$pizzas = $mysqli->query("SELECT * FROM tab_pizze");

		if(!$pizzas)
		{
			$api_result["error"] = "Query error: ".$mysqli->error;
		}
		else
		{
			$api_result["success"] = true;
			$api_result["response"] = $pizzas->fetch_all(MYSQLI_ASSOC);
		}
	}

	echo json_encode($api_result);
?>