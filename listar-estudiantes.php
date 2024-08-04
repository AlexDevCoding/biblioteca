<?php
include 'config.php';

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; 
$offset = ($page - 1) * $limit;

// Obtener el parámetro de búsqueda
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';

// Consulta SQL para buscar y paginar
$sql = "SELECT id, cedula, nombre, apellido, curso, telefono, fecha_ingreso 
        FROM estudiantes 
        WHERE nombre LIKE '%$search%' OR apellido LIKE '%$search%' 
        LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$data = array();
$total_pages = 1; 

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row["fecha_ingreso"] = isset($row["fecha_ingreso"]) ? date("d/m/Y", strtotime($row["fecha_ingreso"])) : "No disponible";
        $data[] = $row;
    }

    // Obtener el total de registros filtrados
    $sql_total = "SELECT COUNT(*) as total 
                  FROM estudiantes 
                  WHERE nombre LIKE '%$search%' OR apellido LIKE '%$search%'";
    $result_total = $conn->query($sql_total);
    $total = $result_total->fetch_assoc()['total'];
    $total_pages = ceil($total / $limit);
} else {
    $data = ["message" => "No se encontraron registros."];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'students' => $data,
    'total_pages' => $total_pages
]);
?>
