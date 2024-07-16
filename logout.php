<?php
// Iniciar o reanudar la sesión
session_start();

// Finalizar la sesión actual
session_destroy();

// Redirigir al usuario al formulario de login
header("Location: templates/login.html");
exit();
?>
