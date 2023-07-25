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
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "class not found";
} else {
    $response['status'] = "class found";
    $response['name'] = $class_name;
    $response['subject'] = $class_topic;
}
echo json_encode($response);
