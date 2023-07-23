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

    if (isset($_POST["save_picture"])) {
        $targetDir = "users/user_$id/"; // Directory where uploaded files will be stored
        $targetFile = $targetDir . basename($_FILES["fileToUpload"]["name"]); // Full path to the uploaded file
        $uploadOk = 1; // Flag to indicate if the file upload was successful

        // Check if the file is an actual file or a fake one
        if (isset($_FILES["fileToUpload"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if ($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }

        // Check if file already exists
        if (file_exists($targetFile)) {
            echo "Sorry, the file already exists.";
            $uploadOk = 0;
        }

        // Check file size (you can set your own limit)
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow only certain file formats (in this example, we only allow images)
        $allowedTypes = array("jpg", "jpeg", "png", "gif");
        $fileExtension = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $allowedTypes)) {
            echo "Sorry, only JPG, JPEG, PNG, and GIF files are allowed.";
            $uploadOk = 0;
        }

        // If the uploadOk flag is set to 0, there was an error, so we don't proceed with the file upload
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            // Move the uploaded file from the temporary directory to the specified directory
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
                echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }
};
