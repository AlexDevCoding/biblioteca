<?php
session_start();
include 'config.php';

if (!isset($_SESSION['id'])) {
    header("Location: templates/login.html"); // Redirigir a la página de login si no hay sesión activa
    exit();
}

$id = $_SESSION['id']; // Obtener el ID del usuario logueado

// Obtener los datos del usuario desde la base de datos
$sql = "SELECT nombre, apellido, usuario, correo FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($nombre, $apellido, $usuario, $correo);
$stmt->fetch();

$data = [
    'id' => $id,
    'nombre' => $nombre,
    'apellido' => $apellido,
    'usuario' => $usuario,
    'correo' => $correo,
];

echo json_encode($data);

$stmt->close();
$conn->close();
?>
