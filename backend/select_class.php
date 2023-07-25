<?php
include('connection.php');


$user_id = $_POST['user_id'];


$query = $mysqli->prepare('select class_id from teachers where user_id=?');
$query->bind_param('i', $user_id);
$query->execute();

$array = $query->get_result();

$response = [];
while ($classes = $array->fetch_assoc()) {
    $response['teacher'] = $classes;
}


$query = $mysqli->prepare('select class_id from students where user_id=?');
$query->bind_param('i', $user_id);
$query->execute();

$array = $query->get_result();

while ($classes = $array->fetch_assoc()) {

    $response["student"] = $classes;
}


$query = $mysqli->prepare('select class_id from admins where user_id=?');
$query->bind_param('i', $user_id);
$query->execute();

$array = $query->get_result();

while ($classes = $array->fetch_assoc()) {

    $response["admin"] = $classes;
}


echo json_encode($response);
