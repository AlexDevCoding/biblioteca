<?php

include 'config.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $sql = "SELECT * FROM estudiantes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $response['student'] = $result->fetch_assoc();
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $curso = $_POST['curso'];
    $telefono = $_POST['telefono'];
    $fecha_ingreso = $_POST['fecha_ingreso'];
    
    $sql = "UPDATE estudiantes SET cedula = ?, nombre = ?, apellido = ?, curso = ?, telefono = ?, fecha_ingreso = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssisi", $cedula, $nombre, $apellido, $curso, $telefono, $fecha_ingreso, $id);
    
    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }
    
    $stmt->close();
}

$conn->close();
echo json_encode($response);
?>