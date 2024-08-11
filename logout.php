<?php
session_start();
session_unset();
session_destroy();
header("Location: templates/login.html"); // Redirige al login después de cerrar sesión
exit();
?>
