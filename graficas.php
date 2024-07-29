<?php
header('Content-Type: application/json');

include 'config.php';

$sql = "SELECT COUNT(*) as count, curso FROM estudiantes GROUP BY curso";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode([]);
    $conn->close();
    exit();
}

echo json_encode($data);
$conn->close();
?>
