<?php

include('connection.php');

$id = $_POST['id'];

$class_names = $mysqli->prepare('SELECT classes.id FROM classes JOIN teachers ON teachers.class_id = classes.id WHERE teachers.user_id =?;');
$class_names->bind_param('i', $id);
$class_names->execute();
$class_names->store_result();
$class_names->bind_result($result);
$class_names->fetch();

$num_rows = $class_names->num_rows();
if ($num_rows == 0) {
echo "empty";
} else {
    $response['result']= $result;
    echo json_encode($response);
}

$title = $_POST['title'];
$instructions = $_POST['instructions'];
$class_id = $result;
$due = date('Y-m-d\TH:i:s', strtotime($_POST['due']));

$query = $mysqli->prepare('insert into assignments(title,instructions,class_id,due) values(?,?,?,?)');
$query->bind_param('ssss',  $title, $instructions, $class_id, $due);
$query->execute();

echo $class_id;
