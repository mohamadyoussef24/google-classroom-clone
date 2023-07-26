
<?php

$id = $_POST('user_id');
$class_id = $_POST('class_id');

$query = $mysqli->prepare('SELECT assignments.title, assignments.instructions, assignments.due_date, users.first_name, users.last_name FROM assignments JOIN teachers ON assignments.class_id =? JOIN users ON teacher.teacher_id =?;');
$query->bind_param('ii', $class_id, $id);
$query->execute();

$query->store_result();
$query->bind_result($title, $instructions, $due, $first_name, $last_name);
$query->fetch();

$response['title'] = $title;
$response['instructions'] = $instructions;
$response['due'] = $due;
$response['first_name'] = $first_name;
$response['last_name'] = $last_name;

echo json_encode($response);