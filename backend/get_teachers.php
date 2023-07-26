<?php

include('connection.php');

$class_code = $_POST['class_code'];

$query = $mysqli->prepare('select id,name,subject
from classes 
where class_code=?');
$query->bind_param('s', $class_code);
$query->execute();

$query->store_result();
$query->bind_result($class_id, $class_name, $class_topic);
$query->fetch();





$teacher = $mysqli->prepare('select first_name, last_name from users join teachers on teachers.user_id = users.id where class_id=?');
$teacher->bind_param('i', $class_id);
$teacher->execute();

$array = $teacher->get_result();
$response = [];
while ($teachers = $array->fetch_assoc()) {
    $result[] = $teachers;
}

echo json_encode($result);