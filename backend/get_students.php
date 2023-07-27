
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






$student = $mysqli->prepare('select first_name, last_name from users join students on students.user_id = users.id where class_id=?');
$student->bind_param('i', $class_id);
$student->execute();

$array = $student->get_result();
    $response = [];
    while($students = $array->fetch_assoc()){
        $response[] = $students;
    }

echo json_encode($response);