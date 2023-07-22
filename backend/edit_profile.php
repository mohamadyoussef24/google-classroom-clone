<?php
include('connection.php');

$flag = $_POST['flag'];
$email = $_POST['email'];

if ($flag == "onload") {
    $query = $mysqli->prepare('select first_name,last_name,profile_pic
    from users 
    where email=?');
    $query->bind_param('s', $email);
    $query->execute();

    $query->store_result();
    $query->bind_result($first_name, $last_name, $profile_pic);
    $query->fetch();

    $response['status'] = 'info found';
    $response['first_name'] = $first_name;
    $response['last_name'] = $last_name;
    $response['profile_pic'] = $profile_pic;
} else {



    // $id = $_POST['user_id'];
    // $first_name = $_POST['first_name'];
    // $last_name = $_POST['last_name'];
    // $profile_pic = $_POST["profile_pic"];


    // $query = $mysqli->prepare('update users set first_name=?,last_name=?,profile_pic=? where id= ?');
    // $query->bind_param('sss', $first_name, $last_name, $profile_pic);
    // $query->execute();

    // $response['status'] = "success";

    $folderName = "./users/user_$id";

    if (!file_exists($folderName)) {
        if (mkdir($folderName)) {
            echo "Folder '$folderName' created successfully.";
        } else {
            echo "Failed to create folder '$folderName'.";
        }
    } else {
        echo "Folder '$folderName' already exists.";
    };
};

echo json_encode($response);
