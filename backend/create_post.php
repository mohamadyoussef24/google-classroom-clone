<?php

include('connection.php');

$class_id = $_POST['class_id'];
$teacher_id = $_POST['teacher_id'];
$message = $_POST['message'];

$query = $mysqli->prepare('insert into announcements(class_id, teacher_id, message) values(?,?,?)');
$query->bind_param('iis', $class_id, $teacher_id, $message);
$query->execute();
$title['title'] = $message;

echo json_encode($title);