<?php

include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $usuario = $_POST['usuario'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT); // me encripta la contraseña

 
    $sql_verificar_usuario = "SELECT usuario FROM usuarios WHERE usuario = ?";
    $stmt_verificar_usuario = $conn->prepare($sql_verificar_usuario);
    $stmt_verificar_usuario->bind_param("s", $usuario);
    $stmt_verificar_usuario->execute();
    $stmt_verificar_usuario->store_result();


    $sql_verificar_correo = "SELECT correo FROM usuarios WHERE correo = ?";
    $stmt_verificar_correo = $conn->prepare($sql_verificar_correo);
    $stmt_verificar_correo->bind_param("s", $correo);
    $stmt_verificar_correo->execute();
    $stmt_verificar_correo->store_result();

    if ($stmt_verificar_usuario->num_rows > 0) {
        echo "El nombre de usuario ya está registrado.";
    } elseif ($stmt_verificar_correo->num_rows > 0) {
        echo "El correo electrónico ya está registrado.";
    } else {
        
        $sql_insertar_usuario = "INSERT INTO usuarios (nombre, apellido, usuario, correo, contrasena) 
                                VALUES (?, ?, ?, ?, ?)";

      
        $stmt_insertar_usuario = $conn->prepare($sql_insertar_usuario);
        $stmt_insertar_usuario->bind_param("sssss", $nombre, $apellido, $usuario, $correo, $contrasena);

   
        if ($stmt_insertar_usuario->execute()) {
    
            header("Location: templates/login.html");
            exit();
        } else {
            echo "Error al registrar el usuario: " . $conn->error;
        }


        $stmt_insertar_usuario->close();
    }


    $stmt_verificar_usuario->close();
    $stmt_verificar_correo->close();
}


$conn->close();
?>

