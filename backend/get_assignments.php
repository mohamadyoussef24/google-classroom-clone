
<?php

include('connection.php');

    if(isset($_POST['class_code'])) {
        $class_code = $_POST['class_code'];


        
        $query = $mysqli->prepare('select id,name,subject
    from classes 
    where class_code=?');
    $query->bind_param('s', $class_code);
    $query->execute();

    $query->store_result();
    $query->bind_result($id, $class_name, $class_topic);
    $query->fetch();





    $query = $mysqli->prepare('select id,title,instructions,due from assignments where class_id=?');
    $query->bind_param('i', $id);
    $query->execute();

    $array = $query->get_result();
        $response = [];
        while($assignment = $array->fetch_assoc()){
            $response[] = $assignment;
        }

    echo json_encode($response);
    }
    else {
        echo "Class ID not set";
    }
