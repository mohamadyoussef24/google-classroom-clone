<?php

include('connection.php');

$id = $_POST['id'];
$class_code = $_POST['class_code'];
$query = $mysqli->prepare('select id,name,subject
from classes 
where class_code=?');
$query->bind_param('s', $class_code);
$query->execute();

$query->store_result();
$query->bind_result($class_id, $class_name, $class_topic);
$query->fetch();


$query = $mysqli->prepare('select id
from teachers 
where user_id=?');
$query->bind_param('i', $id);
$query->execute();

$query->store_result();
$query->bind_result($teacher_id);
$query->fetch();


$title = $_POST['title'];
$instructions = $_POST['instructions'];

$due = date('Y-m-d\TH:i:s', strtotime($_POST['due']));

$query = $mysqli->prepare('insert into assignments(title,instructions,class_id,teacher_id,due) values(?,?,?,?,?)');
$query->bind_param('ssiis',  $title, $instructions, $class_id, $teacher_id ,$due);
$query->execute();






    if (isset($_FILES['uploadedFiles'])) {
            
           

        $id = $_POST['id']; 
            $class_code = $_POST['class_code']; 


            $query = $mysqli->prepare('select id
    from classes 
    where class_code=?');
    $query->bind_param('s', $code);
    $query->execute();

    $query->store_result();
    $query->bind_result($class_id);
    $query->fetch();

         



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
                    
                    
                        $query = $mysqli->prepare('select MAX(id)
                        from assignments 
                        where teacher_id=? and class_id=?');
                        $query->bind_param('ii', $teacher_id,$class_id);
                        $query->execute();

                        $query->store_result();
                        $query->bind_result($assignment_id);
                        $query->fetch();


                        

                        $query = $mysqli->prepare('insert into teacher_files (assignment_id,teacher_id,file_path) values(?,?,?)');
                        $query->bind_param('iis',  $assignment_id, $teacher_id, $destination);
                        $query->execute();
                        




                        echo "File was uploaded successfully.";
                

                } else {
                    echo "Error moving file";
                   
                }
            } else {
                echo "Error uploading file";
              
            }
        }

    } else {


        $destination="";
        $query = $mysqli->prepare('select id
        from assignments 
        where teacher_id=? and class_id=? ORDER BY id DESC LIMIT 0, 1');
        $query->bind_param('ii', $teacher_id,$class_id);
        $query->execute();

        $query->store_result();
        $query->bind_result($assignment_id);
        $query->fetch();


        

        $query = $mysqli->prepare('insert into teacher_files (assignment_id,teacher_id,file_path) values(?,?,?)');
        $query->bind_param('iis',  $assignment_id, $teacher_id, $destination);
        $query->execute();


      echo "No files were uploaded.";
       
    }







   
    
    