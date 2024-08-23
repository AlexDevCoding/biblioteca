<?php
session_start();
include 'config.php';

if (!isset($_SESSION['id'])) {
    header("Location: templates/login.html");
    exit();
}

$id = $_SESSION['id']; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $usuario = $_POST['usuario'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];


    $sql = "SELECT id FROM usuarios WHERE usuario = ? AND id != ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $usuario, $id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "El nombre de usuario ya está en uso.";
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();


    $sql = "SELECT contrasena FROM usuarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($contrasena_actual);
    $stmt->fetch();
    $stmt->close();

 
    if (empty($contrasena)) {
        $contrasena_hash = $contrasena_actual;
    } else {
        $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);
    }

 
    $sql = "UPDATE usuarios SET nombre = ?, apellido = ?, usuario = ?, correo = ?, contrasena = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $nombre, $apellido, $usuario, $correo, $contrasena_hash, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Datos actualizados correctamente";
    } else {
        echo "No se realizaron cambios";
    }

    $stmt->close();
    $conn->close();
}
?>
