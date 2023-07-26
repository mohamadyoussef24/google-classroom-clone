<?php

include('connection.php');

$id = $_POST['id'];
$class_code = $_POST['class_code'];
$query = $mysqli->prepare('select id,name,subject
from classes 
where class_code=?');
$query->bind_param('s', $class_code);
$query->execute();

$query->store_result();
$query->bind_result($class_id, $class_name, $class_topic);
$query->fetch();


$query = $mysqli->prepare('select id
from teachers 
where user_id=?');
$query->bind_param('i', $id);
$query->execute();

$query->store_result();
$query->bind_result($teacher_id);
$query->fetch();

// $class_names = $mysqli->prepare('SELECT classes.id FROM classes JOIN teachers ON teachers.class_id = classes.id WHERE teachers.user_id =?;');
// $class_names->bind_param('i', $id);
// $class_names->execute();
// $class_names->store_result();
// $class_names->bind_result($result);
// $class_names->fetch();

// $num_rows = $class_names->num_rows();
// if ($num_rows == 0) {
// echo "empty";
// } else {
//     $response['result']= $result;
//     echo json_encode($response);
// }

$title = $_POST['title'];
$instructions = $_POST['instructions'];

$due = date('Y-m-d\TH:i:s', strtotime($_POST['due']));

$query = $mysqli->prepare('insert into assignments(title,instructions,class_id,teacher_id,due) values(?,?,?,?,?)');
$query->bind_param('ssiis',  $title, $instructions, $class_id, $teacher_id ,$due);
$query->execute();

echo "Assignment Added";
