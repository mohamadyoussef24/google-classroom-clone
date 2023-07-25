<?php

include('connection.php');


$id = $_POST['user_id'];

$query = $mysqli->prepare('select name from classes join teachers on teachers.class_id = classes.id where user_id=?');
$query->bind_param('i', $id);
$query->execute();

$array = $query->get_result();
$response = [];
while ($assignment = $array->fetch_assoc()) {
    $response[] = $assignment;
}

echo json_encode($response);
