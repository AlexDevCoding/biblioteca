<?php
header('Content-Type: application/json');


include 'config.php';


$cursos = [];
$fechas = [];


try {

    $sqlCursos = "SELECT curso, COUNT(*) as total FROM estudiantes GROUP BY curso";
    $resultCursos = $conn->query($sqlCursos);

    if (!$resultCursos) {
        throw new Exception("Error en la consulta de cursos: " . $conn->error);
    }

    while ($row = $resultCursos->fetch_assoc()) {
        $cursos[$row['curso']] = $row['total'];
    }

    
    $sqlFechas = "
        SELECT DATE_FORMAT(fecha_ingreso, '%Y-%m') as mes, COUNT(*) as total
        FROM estudiantes
        GROUP BY mes
    ";
    $resultFechas = $conn->query($sqlFechas);

    if (!$resultFechas) {
        throw new Exception("Error en la consulta de fechas: " . $conn->error);
    }

    while ($row = $resultFechas->fetch_assoc()) {
        $fechas[$row['mes']] = $row['total'];
    }
    
} catch (Exception $e) {
 
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}


$conn->close();


echo json_encode([
    "cursos" => $cursos,
    "fechas" => $fechas
]);
?>

