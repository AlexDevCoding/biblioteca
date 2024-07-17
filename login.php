<?php
// Incluir el archivo de configuración de la base de datos
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    // Preparar la consulta SQL para buscar el usuario en la base de datos
    $sql = "SELECT id, usuario, contrasena FROM usuarios WHERE usuario = ?";

    // Preparar la declaración
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);

    // Ejecutar la consulta
    $stmt->execute();
    $stmt->store_result();

    // Verificar si se encontró el usuario
    if ($stmt->num_rows > 0) {
        // Vincular variables de resultado
        $stmt->bind_result($id, $usuario_db, $contrasena_hash);

        // Obtener el resultado (debería ser solo uno)
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($contrasena, $contrasena_hash)) {
            // Iniciar sesión (puedes implementar tu lógica de sesión aquí)
            session_start();
            $_SESSION['id'] = $id;
            $_SESSION['usuario'] = $usuario_db;

            // Redirigir a la página de inicio o a donde necesites después del login
            header("Location: templates/index.html");
            exit();
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "Usuario no encontrado";
        
    }

    // Cerrar la declaración
    $stmt->close();
}

// Cerrar la conexión
$conn->close();
?>
