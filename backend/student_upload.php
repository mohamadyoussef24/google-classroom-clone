
<?php
include('connection.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_FILES['uploadedFiles'])) {
            
            $class_code = $_POST['class_code']; 

            $assignment_id= $_POST['assignment_id'];
            
            $query = $mysqli->prepare('select id
from classes 
where class_code=?');
$query->bind_param('s', $code);
$query->execute();

$query->store_result();
$query->bind_result($class_id);
$query->fetch();

            
            $query = $mysqli->prepare('select id
from students
where class_id=?');
$query->bind_param('i', $class_id);
$query->execute();

$query->store_result();
$query->bind_result($students_id);
$query->fetch();
            
            $dir = "./classes/class_$class_id/student_$students_id/";

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

                    $query = $mysqli->prepare('insert into files (assignment_id,student_id,file_path) values(?,?,?)');
                    $query->bind_param('iis',  $assignment_id, $student_id, $destination);
                    $query->execute();
                    
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
