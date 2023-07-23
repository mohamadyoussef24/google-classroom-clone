<?php

include('connection.php');

$class_id = $_POST['class_id'];

$teacher = $mysqli->prepare('select first_name, last_name from users join teachers on teachers.user_id = users.id where class_id=?');
$teacher->bind_param('i', $class_id);
$teacher->execute();

$array = $teacher->get_result();
$response = [];
while ($teachers = $array->fetch_assoc()) {
    $result[] = $teachers;
}

echo json_encode($result);