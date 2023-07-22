<?php
include('connection.php');
$email = $_POST['email'];

if (isset($_POST["email"]) && $_POST["email"] != "") {
    $email = $_POST["email"];
    $new_password = $_POST['password'];
    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('update users set password=? where email= ?');
    $query->bind_param('ss', $hashed_password, $email);
    $query->execute();

    $response['status'] = "password changed";
} else {

    $response = [];
    $response["success"] = false;
}

echo json_encode($response);
