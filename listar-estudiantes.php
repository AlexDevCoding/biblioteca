<?php
include 'config.php';

function getPaginatedStudents($conn, $search, $limit, $offset) {
    $stmt = $conn->prepare("SELECT id, cedula, nombre, apellido, curso, telefono, fecha_ingreso 
                            FROM estudiantes 
                            WHERE nombre LIKE ? OR apellido LIKE ?
                            LIMIT ? OFFSET ?");
    $search_param = "%$search%";
    $stmt->bind_param("ssii", $search_param, $search_param, $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $row["fecha_ingreso"] = isset($row["fecha_ingreso"]) ? date("d/m/Y", strtotime($row["fecha_ingreso"])) : "No disponible";
        $data[] = $row;
    }
    $stmt->close();
    
    return $data;
}

function getTotalPages($conn, $search, $limit) {
    $stmt = $conn->prepare("SELECT COUNT(*) as total 
                            FROM estudiantes 
                            WHERE nombre LIKE ? OR apellido LIKE ?");
    $search_param = "%$search%";
    $stmt->bind_param("ss", $search_param, $search_param);
    $stmt->execute();
    $result = $stmt->get_result();
    $total = $result->fetch_assoc()['total'];
    $stmt->close();
    
    return ceil($total / $limit);
}

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; 
$offset = ($page - 1) * $limit;
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';

$data = getPaginatedStudents($conn, $search, $limit, $offset);
$total_pages = getTotalPages($conn, $search, $limit);

$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'students' => $data,
    'total_pages' => $total_pages
]);
?>
