
<?php
include('connection.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['uploadedFiles'])) {
            
            $class_id = 0; // Replace 0 with the actual class ID
            $id = 1; // Replace 1 with the actual student ID
            $dir = "./classes/class_$class_id/student_$id/";

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
