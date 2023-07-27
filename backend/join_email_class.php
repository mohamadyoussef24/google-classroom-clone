<?php
include('connection.php');

$email = $_POST['email'];
$class_code = $_POST['class_code'];

$check_email = $mysqli->prepare('select id from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$check_email->bind_result($user_id);
$check_email->fetch();

$response['user_id'] = $user_id;

if ($check_email->num_rows() == 0) {
    die("User not found.");
}

$query = $mysqli->prepare('select id from classes where class_code=?');
$query->bind_param('s', $class_code);
$query->execute();
$query->store_result();
$query->bind_result($class_id);
$query->fetch();

if ($query->num_rows() == 0) {
    die("Class not found.");
}


if ($class_id && $user_id) {
    $insert_query = $mysqli->prepare('insert into students(class_id, user_id) values (?, ?)');
    $insert_query->bind_param('ii', $class_id, $user_id);
    $insert_query->execute();
} else {
    die("Invalid class_id or user_id.");
}

echo json_encode($response);
