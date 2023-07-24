
<?php

include('connection.php');

$class_id = $_POST['class_id'];

$student = $mysqli->prepare('select first_name, last_name from users join students on students.user_id = users.id where class_id=?');
$student->bind_param('i', $class_id);
$student->execute();

$array = $student->get_result();
    $response = [];
    while($students = $array->fetch_assoc()){
        $response[] = $students;
    }

echo json_encode($response);