<?php
include('connection.php');

if (isset($_POST["email"]) && $_POST["email"] != "") {
    $email = $_POST["email"];
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('update users set password=? where email= ?');
    $query->bind_param('ss', $hashed_password, $email);
    $query->execute();

    $response['status'] = "password changed";
} else {

    $response["status"] = "false";
}

echo json_encode($response);
