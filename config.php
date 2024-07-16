<?php
$servername = "localhost"; // Nombre del servidor MySQL (puede ser una IP o un nombre de dominio)
$username = "root";     // Usuario de MySQL
$password = "";  // Contraseña de MySQL
$database = "biblioteca";    // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
