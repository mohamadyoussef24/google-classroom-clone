<?php
include('connection.php');

$user_id = $_POST['user_id'];
$code = $_POST['class_code'];

$query = $mysqli->prepare('select id
from classes 
where class_code=?');
$query->bind_param('s', $code);
$query->execute();

$query->store_result();
$query->bind_result($class_id);
$query->fetch();
$num_rows = $query->num_rows();


if ($num_rows == 0) {
    $response['status'] = "class not found";
} else {
    $query = $mysqli->prepare('select id
    from teachers 
    where class_id=?');
    $query->bind_param('i', $class_id);
    $query->execute();
    $query->store_result();
    $query->bind_result($class_id1);
    $query->fetch();
    $num_rows2 = $query->num_rows();


    $query = $mysqli->prepare('select id
    from teachers 
    where class_id=?');
    $query->bind_param('i', $class_id);
    $query->execute();
    $query->store_result();
    $query->bind_result($class_id2);
    $query->fetch();
    $num_rows3 = $query->num_rows();


    if ($num_rows2 == 0 && $num_rows3==0) {

        $query = $mysqli->prepare('insert into students(class_id,user_id)  values(?,?)');
        $query->bind_param('ii', $class_id, $user_id);
        $query->execute();
        $response['status'] = "success";
        $response['class_id'] = $class_id;
        $response['user_id '] = $user_id;
    } else {
        $response['status'] = "You are already in class";
    }
}

echo json_encode($response);
