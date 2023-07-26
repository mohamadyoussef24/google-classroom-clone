
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

$send['zero']=$response;
$query= $mysqli->prepare('SELECT file_path from teacher_files where assignment_id=?');
// $query = $mysqli->prepare('SELECT assignments.title, assignments.instructions, assignments.due_date, users.first_name, users.last_name FROM assignments JOIN teachers ON assignments.class_id =? JOIN users ON teacher.teacher_id =?;');
$query->bind_param('i', $assignment_id);
$query->execute();
$array = $query->get_result();
    $response1 = [];
    while($files = $array->fetch_assoc()){
        $response1[] = $files;
    }

    $send['one']=$response1;


$query= $mysqli->prepare('SELECT file_path from files where assignment_id=?');
// $query = $mysqli->prepare('SELECT assignments.title, assignments.instructions, assignments.due_date, users.first_name, users.last_name FROM assignments JOIN teachers ON assignments.class_id =? JOIN users ON teacher.teacher_id =?;');
$query->bind_param('i', $assignment_id);
$query->execute();
$array = $query->get_result();
    $response2 = [];
    while($files = $array->fetch_assoc()){
        $response2[] = $files;
    }
    
$send['two']=$response2;
echo json_encode($send);