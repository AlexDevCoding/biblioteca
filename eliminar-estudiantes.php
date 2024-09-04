<?php
include 'config.php'; 

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "DELETE FROM estudiantes WHERE id = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar el estudiante']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID no especificado']);
}
?>
