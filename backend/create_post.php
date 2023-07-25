<?php

include('connection.php');

$class_code = $_POST['class_code'];
$teacher_id = $_POST['teacher_id'];
$message = $_POST['message'];




$query = $mysqli->prepare('select id,name,subject
from classes 
where class_code=?');
$query->bind_param('s', $class_code);
$query->execute();

$query->store_result();
$query->bind_result($class_id, $class_name, $class_topic);
$query->fetch();














$query = $mysqli->prepare('insert into announcements(class_id, teacher_id, message) values(?,?,?)');
$query->bind_param('iis', $class_id, $teacher_id, $message);
$query->execute();
$title['title'] = $message;

echo json_encode($title);
