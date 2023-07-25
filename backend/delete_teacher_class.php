<?php
include('connection.php');

$code = $_GET['class_code'];

$student = $mysqli->prepare('DELETE FROM teachers WHERE class_id IN (SELECT id FROM classes WHERE class_code = ?)');
$student->bind_param('s', $code);
$student->execute();

$num_rows = $student->affected_rows;

if ($num_rows !== 0) {
    $response['status'] = "Record deleted successfully";
} else {
    $response['status'] = "Cannot delete this teacher from the class due to error  " . $mysqli->error;
}

echo json_encode($response);

