<?php
include('connection.php');


$email = $_POST['email'];
$password = $_POST['password'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$recovery_email = $_POST['recovery_email'];

if (isset($_POST["email"]) && $_POST["email"] != "") {
    $email = $_POST["email"];
} else {
    $response = [];
    $response["success"] = false;
    echo json_encode($response);
    return;
}

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(email,password,first_name,last_name,recovery_email) values(?,?,?,?,?)');
    $query->bind_param('sssss', $email, $hashed_password, $first_name, $last_name, $recovery_email);
    $query->execute();

    $response['status'] = "success";
} else {
    $response['status'] = "failed";
}

echo json_encode($response);
