<?php
session_start();
include 'config.php';

if (!isset($_SESSION['id'])) {
    header("Location: templates/login.html"); 
    exit();
}

$id = $_SESSION['id']; 


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
