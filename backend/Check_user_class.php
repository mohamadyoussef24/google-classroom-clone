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
    echo json_encode($response);



}else{



    $query = $mysqli->prepare('select user_id
    from teachers 
    where class_id=? and user_id=?');
    $query->bind_param('ii', $class_id, $user_id);
    $query->execute();
    $query->store_result();
    $query->bind_result($user_id1);
    $query->fetch();
    $num_rows2 = $query->num_rows();




    if ($num_rows2 == 0){
        $query = $mysqli->prepare('select user_id
        from students 
        where class_id=? and user_id=?');
        $query->bind_param('ii', $class_id, $user_id);
        $query->execute();
        $query->store_result();
        $query->bind_result($user_id2);
        $query->fetch();
        $num_rows3 = $query->num_rows();

        if ($num_rows3 == 0) {
            $response['status'] = "Not allowed in";
            echo json_encode($response);
        } else {
            $response['status'] = "You are already  a student in this class";
            echo json_encode($response);
        }





    }else{
        $response['status'] = "You are already a teacher in this class";
        echo json_encode($response);
    }
}