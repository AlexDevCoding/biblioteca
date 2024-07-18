<?php

include 'config.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $curso = $_POST['curso'];
    $telefono = $_POST['telefono'];


    if (empty($cedula) || empty($nombre) || empty($apellido) || empty($curso) || empty($telefono)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    $sql_verificar_cedula = "SELECT cedula FROM estudiantes WHERE cedula = ?";
    $stmt_verificar_cedula = $conn->prepare($sql_verificar_cedula);
    $stmt_verificar_cedula->bind_param("s", $cedula);
    $stmt_verificar_cedula->execute();
    $stmt_verificar_cedula->store_result();

    if ($stmt_verificar_cedula->num_rows > 0) {
        echo "El número de cédula ya está registrado.";
    } else {
 
        $sql = "INSERT INTO estudiantes (cedula, nombre, apellido, curso, telefono) VALUES (?, ?, ?, ?, ?)";
        
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sssss", $cedula, $nombre, $apellido, $curso, $telefono);

            if ($stmt->execute()) {
                echo "Estudiante agregado correctamente.";
            } else {
                echo "Error al agregar el estudiante: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta: " . $conn->error;
        }
    }

    $stmt_verificar_cedula->close();
    $conn->close();
}
?>



