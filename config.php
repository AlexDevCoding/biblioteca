<?php
$servername = "localhost"; 
$username = "root";     
$password = "";  
$database = "biblioteca";   


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>


<?php
$id = (int) $_GET['id']; 

include("conexion_db.php");

$sql = "DELETE FROM usuarios WHERE id=?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    echo "<script>alert('El usuario se eliminó correctamente'); location.href='lista-usuarios.php';</script>";
} else {
    echo "<script>alert('Error al eliminar el usuario: " . mysqli_error($conexion) . "'); location.href='lista-usuarios.php';</script>";
}

mysqli_stmt_close($stmt);
mysqli_close($conexion);
?>
