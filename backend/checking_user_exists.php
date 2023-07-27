<?php
include('connection.php');

$email = $_POST['email'];
$class_code = $_POST['class_code'];


$check_email = $mysqli->prepare('select id from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$check_email->bind_result($user_id);
$user_exists = $check_email->num_rows();


if ($user_exists != 0) {

    $query = $mysqli->prepare('select id from classes where class_code=?');
    $query->bind_param('s', $class_code);
    $query->execute();
    $query->store_result();
    $query->bind_result($class_id);


    $check_if_student = $mysqli->prepare('select id from students where user_id=? and class_id=?');
    $check_if_student->bind_param('ii', $user_id, $class_id);
    $check_if_student->execute();
    $check_if_student->store_result();
    $check_if_student->bind_result($student_id);
    $already_student = $check_if_student->num_rows();

    if ($already_student == 0) {

        $check_if_teacher = $mysqli->prepare('select id from teachers where user_id=? and class_id=?');
        $check_if_teacher->bind_param('ii', $user_id, $class_id);
        $check_if_teacher->execute();
        $check_if_teacher->store_result();
        $check_if_teacher->bind_result($teacher_id);
        $already_teacher = $check_if_teacher->num_rows();

        if ($already_teacher == 0) {
            $response['status'] = "email sent";
        } else {
            $response['status'] = "already a teacher";
        }
    } else {
        $response['status'] = "already a student";
    }
} else {
    $response['status'] = "user does not exist";
}


echo json_encode($response);
