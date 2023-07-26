<?php
include('connection.php');

$email = $_POST['email'];
$class_code = $_POST['class_code'];

$query = $mysqli->prepare('insert into users(email,password,first_name,last_name) values(?,?,?,?)');
$query->bind_param('ssss', $email, $hashed_password, $first_name, $last_name);
$query->execute();
