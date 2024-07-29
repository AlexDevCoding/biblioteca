<?php
include 'config.php';

$sql = "SELECT id, cedula, nombre, apellido, curso, telefono, fecha_ingreso FROM estudiantes";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row["fecha_ingreso"] = isset($row["fecha_ingreso"]) ? date("d/m/Y", strtotime($row["fecha_ingreso"])) : "No disponible";
        $data[] = $row;
    }
} else {
    $data = ["message" => "No se encontraron registros."];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>
