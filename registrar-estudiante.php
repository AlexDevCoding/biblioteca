<?php

include 'config.php';

$response = array("success" => false);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $curso = $_POST['curso'];
    $telefono = $_POST['telefono'];
    $fecha = $_POST['fecha'];

    if (empty($cedula) || empty($nombre) || empty($apellido) || empty($curso) || empty($telefono) || empty($fecha)) {
        echo json_encode($response);
        exit;
    }

    $sql_verificar_cedula = "SELECT cedula FROM estudiantes WHERE cedula = ?";
    $stmt_verificar_cedula = $conn->prepare($sql_verificar_cedula);
    $stmt_verificar_cedula->bind_param("s", $cedula);
    $stmt_verificar_cedula->execute();
    $stmt_verificar_cedula->store_result();

    if ($stmt_verificar_cedula->num_rows > 0) {
        echo json_encode($response);
    } else {
        $sql = "INSERT INTO estudiantes (cedula, nombre, apellido, curso, telefono, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?)";
        
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ssssss", $cedula, $nombre, $apellido, $curso, $telefono, $fecha);

            if ($stmt->execute()) {
                $response["success"] = true;
            }

            $stmt->close();
        }
    }

    $stmt_verificar_cedula->close();
    $conn->close();
}

echo json_encode($response);
?>
