
<?php
include('connection.php');
$assignment_id = $_POST['assignment_id'];

$query= $mysqli->prepare('SELECT title,instructions,due from assignments where id=?');
// $query = $mysqli->prepare('SELECT assignments.title, assignments.instructions, assignments.due_date, users.first_name, users.last_name FROM assignments JOIN teachers ON assignments.class_id =? JOIN users ON teacher.teacher_id =?;');
$query->bind_param('i', $assignment_id);
$query->execute();

$query->store_result();
$query->bind_result($title, $instructions, $due);
$query->fetch();

$response['title'] = $title;
$response['instructions'] = $instructions;
$response['due'] = $due;


echo json_encode($response);