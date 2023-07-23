<?php
include('connection.php');


$email = $_POST['email'];
$password = $_POST['password'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];

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
    $query = $mysqli->prepare('insert into users(email,password,first_name,last_name) values(?,?,?,?)');
    $query->bind_param('ssss', $email, $hashed_password, $first_name, $last_name);
    $query->execute();

    $response['status'] = "success";

    $query = $mysqli->prepare('select id
    from users 
    where email=?');
    $query->bind_param('s', $email);
    $query->execute();
    $query->bind_result($id);
    $query->fetch();

    $response['user_id'] = $id;
} else {
    $response['status'] = "failed";
}



echo json_encode($response);
