<?php
include('connection.php');


function makeid($length)
{
    $result = '';
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $charactersLength = strlen($characters);
    $counter = 0;
    while ($counter < $length) {
        $result .= $characters[rand(0, $charactersLength - 1)];
        $counter += 1;
    }
    return $result;
}


$name = $_POST['name'];
$section = $_POST['section'];
$subject = $_POST['subject'];
$room = $_POST['room'];
$id = $_POST['user_id'];
// $cover = $_POST['cover'];
// $class_profile = $_POST['class_profile'];


$code_exists = -1;


while ($code_exists != 0) {
    $code = makeid(6);

    $check_code = $mysqli->prepare('select * from classes where class_code=?');
    $check_code->bind_param('s', $code);
    $check_code->execute();
    $check_code->store_result();
    $code_exists = $check_code->num_rows();
}



$query = $mysqli->prepare('insert into classes(name,section,subject,room, class_code)  values(?,?,?,?,?)');
$query->bind_param('sssss', $name, $section, $subject, $room, $code);
$query->execute();



// class id

$query = $mysqli->prepare('select id from classes 
where class_code=?');
$query->bind_param('s', $code);
$query->execute();

$query->store_result();
$query->bind_result($class_id);
$query->fetch();

// teacher

$query = $mysqli->prepare('insert into teachers(class_id,user_id)  values(?,?)');
$query->bind_param('ii', $class_id, $id);
$query->execute();


// admin

$query = $mysqli->prepare('insert into admins(class_id,user_id)  values(?,?)');
$query->bind_param('ii', $class_id, $id);
$query->execute();


$response['status'] = "success";
echo json_encode($response);
