<?php
include('connection.php');
if (isset($_POST['email'])) {

    $email=$_POST['email'];
    $code = $_POST['class_code'];

    $query = $mysqli->prepare('select id
from users
where email=?');
$query->bind_param('s', $email);
$query->execute();

$query->store_result();
$query->bind_result($user_id);
$query->fetch();
$num_rows = $query->num_rows();


}else{
$user_id = $_POST['user_id'];
$code = $_POST['class_code'];
}


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

} else {
    
    $query = $mysqli->prepare('select user_id
    from teachers 
    where class_id=? and user_id=?');
    $query->bind_param('ii', $class_id, $user_id);
    $query->execute();
    $query->store_result();
    $query->bind_result($user_id1);
    $query->fetch();
    $num_rows2 = $query->num_rows();

    if ($num_rows2 == 0) {

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

            $query = $mysqli->prepare('insert into students(class_id,user_id)  values(?,?)');
            $query->bind_param('ii', $class_id, $user_id);
            $query->execute();
            $response['status'] = "success";
            $response['class_id'] = $class_id;
            $response['user_id '] = $user_id;
            echo json_encode($response);
        } else {
            $response['status'] = "You are already  a student in this class";
            echo json_encode($response);
        }

        
    } else {
        $response['status'] = "You are already a teacher in this class";
        echo json_encode($response);
    }
}

// echo json_encode($response);
