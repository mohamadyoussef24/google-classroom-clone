
<?php
include('connection.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['uploadedFiles'])) {
            
           


            $class_code = $_POST['class_code']; 


            $query = $mysqli->prepare('select id
    from classes 
    where class_code=?');
    $query->bind_param('s', $code);
    $query->execute();

    $query->store_result();
    $query->bind_result($class_id);
    $query->fetch();

            $id = $_POST['user_id']; 























            $dir = "./classes/class_$class_id/teacher_$id/";

            if (!file_exists($dir)) {
                if (mkdir($dir, 0755, true)) {
                    echo "Directory created successfully.";
                } else {
                    echo "Failed to create the directory.";
                }
            } else {
                echo "Directory already exists.";
            }
            

        // Loop through each uploaded file
        foreach ($_FILES['uploadedFiles']['name'] as $index => $fileName) {
            $tempFilePath = $_FILES['uploadedFiles']['tmp_name'][$index];

            // Check if the file was uploaded successfully
            if ($_FILES['uploadedFiles']['error'][$index] === UPLOAD_ERR_OK) {
                $fileName = uniqid() . '_' . $fileName;
                $destination = $dir . $fileName;
                // Move the file to the desired path on the server
                if (move_uploaded_file($tempFilePath, $destination)) {
                    echo "File {$fileName} was uploaded successfully.\n";
                } else {
                    echo "Error moving file {$fileName} to the server.\n";
                }
            } else {
                echo "Error uploading file {$fileName}. Error code: {$_FILES['uploadedFiles']['error'][$index]}\n";
            }
        }
    } else {
        echo "No files were uploaded.";
    }
} else {
    echo "Invalid request method.";
}
?>
