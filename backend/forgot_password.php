<?php
include('connection.php');
$email = $_POST['email'];

if (isset($_POST["email"]) && $_POST["email"] != "") {
    $email = $_POST["email"];
    $new_password = $_POST['password'];
    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(password) values(?)');
    $query->bind_param('s',$hashed_password);
    $query->execute();

$response['status'] = "password changed";


} else {

    $response = [];
    $response["success"] = false;
   
   
}

echo json_encode($response);