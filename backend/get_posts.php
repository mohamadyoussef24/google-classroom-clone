

<?php

include('connection.php');

if(isset($_POST['class_id'])) {
    $id = $_POST['class_id'];

$query = $mysqli->prepare('select message from announcements join where class_id=?');
$query->bind_param('i', $id);
$query->execute();

$array = $query->get_result();
    $response = [];
    while($post = $array->fetch_assoc()){
        $response[] = $post;
    }

echo json_encode($response);
}
 else {
    echo "Class ID not set";
}