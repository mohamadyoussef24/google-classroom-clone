<?php
include('connection.php');


$class_id = $_POST['class_id'];



$query = $mysqli->prepare('select name,subject
from classes 
where id=?');
$query->bind_param('s', $class_id);
$query->execute();

$array = $query->get_result();


$response = [];

while ($classes = $array->fetch_assoc()) {
    $response[] = $classes;
}

echo json_encode($response);
