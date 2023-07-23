<?php
include('connection.php');

$flag = $_POST['flag'];



if ($flag == "onload") {
    $email = $_POST['email'];
    $query = $mysqli->prepare('select first_name,last_name
    from users 
    where email=?');
    $query->bind_param('s', $email);
    $query->execute();

    $query->store_result();
    $query->bind_result($first_name, $last_name);
    $query->fetch();

    $response['status'] = 'info found';
    $response['first_name'] = $first_name;
    $response['last_name'] = $last_name;
    // $response['profile_pic'] = $profile_pic;
    echo json_encode($response);
} elseif ($flag == "not onload") {
    $email = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];

    $query = $mysqli->prepare('update users set first_name=?, last_name=? where email= ?');
    $query->bind_param('sss', $first_name, $last_name, $email);
    $query->execute();



    $response['status'] = 'update info';
    $response['first_name'] = $first_name;
    $response['last_name'] = $last_name;
    echo json_encode($response);
} else {
    $id = $_POST['id'];
    $root = $_SERVER["DOCUMENT_ROOT"];
    echo $root;
    $dir = "./users/user_$id";

    if (!file_exists($dir)) {

        if (mkdir($dir, 0755, true)) {
            echo "Directory created successfully.";
        } else {
            echo "Failed to create the directory.";
        }
    } else {
        echo "Directory already exists.";
    }

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (isset($_FILES["file"])) {
            $file = $_FILES["file"];

            // File properties
            $fileName = $file["name"];
            $fileTmpName = $file["tmp_name"];
            $fileSize = $file["size"];
            $fileError = $file["error"];

            // Handle the file as needed (e.g., move it to a specific location)
            // Example:

            $targetDir = "./users/user_$id/";
            $targetFilePath = $targetDir . $fileName;
            move_uploaded_file($fileTmpName, $targetFilePath);

            // Send a response (you can customize this as per your requirements)

            $query = $mysqli->prepare('update users set profile_pic=? where id= ?');
            $query->bind_param('si', $targetFilePath, $id);
            $query->execute();
            echo "File uploaded successfully.";
        } else {
            echo "No file uploaded.";
        }
    }
};
