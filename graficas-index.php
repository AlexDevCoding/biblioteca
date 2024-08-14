<?php
include 'config.php'; 

$startOfWeek = date('Y-m-d', strtotime('monday this week'));
$endOfWeek = date('Y-m-d', strtotime('sunday this week'));

$startOfMonth = date('Y-m-01');
$endOfMonth = date('Y-m-t'); 

$resultData = [];


$sqlTotal = "SELECT COUNT(*) AS total_students FROM estudiantes";
if ($stmtTotal = $conn->prepare($sqlTotal)) {
    $stmtTotal->execute();
    $resultTotal = $stmtTotal->get_result();
    if ($rowTotal = $resultTotal->fetch_assoc()) {
        $resultData['total_students'] = $rowTotal['total_students'];
    } else {
        $resultData['total_students'] = '0'; 
    }
    $resultTotal->free();
    $stmtTotal->close();
} else {
    $resultData['total_students'] = 'Error en la consulta: ' . $conn->error;
}


$sqlWeek = "SELECT COUNT(*) AS student_count FROM estudiantes WHERE fecha_ingreso BETWEEN ? AND ?";
if ($stmtWeek = $conn->prepare($sqlWeek)) {
    $stmtWeek->bind_param('ss', $startOfWeek, $endOfWeek);
    $stmtWeek->execute();
    $resultWeek = $stmtWeek->get_result();
    if ($rowWeek = $resultWeek->fetch_assoc()) {
        $resultData['students_this_week'] = $rowWeek['student_count'];
    } else {
        $resultData['students_this_week'] = '0';
    }
    $resultWeek->free();
    $stmtWeek->close();
} else {
    $resultData['students_this_week'] = 'Error en la consulta: ' . $conn->error;
}


$sqlMonth = "SELECT COUNT(*) AS student_count FROM estudiantes WHERE fecha_ingreso BETWEEN ? AND ?";
if ($stmtMonth = $conn->prepare($sqlMonth)) {
    $stmtMonth->bind_param('ss', $startOfMonth, $endOfMonth);
    $stmtMonth->execute();
    $resultMonth = $stmtMonth->get_result();
    if ($rowMonth = $resultMonth->fetch_assoc()) {
        $resultData['students_this_month'] = $rowMonth['student_count'];
    } else {
        $resultData['students_this_month'] = '0';
    }
    $resultMonth->free();
    $stmtMonth->close();
} else {
    $resultData['students_this_month'] = 'Error en la consulta: ' . $conn->error;
}


$sqlCourses = "SELECT curso, COUNT(*) AS student_count FROM estudiantes GROUP BY curso";
if ($stmtCourses = $conn->prepare($sqlCourses)) {
    $stmtCourses->execute();
    $resultCourses = $stmtCourses->get_result();
    $coursesData = [];
    while ($rowCourses = $resultCourses->fetch_assoc()) {
        $coursesData[] = [
            'category' => $rowCourses['curso'],
            'count' => $rowCourses['student_count']
        ];
    }
    $resultData['course_categories'] = $coursesData;
    $resultCourses->free();
    $stmtCourses->close();
} else {
    $resultData['course_categories'] = 'Error en la consulta: ' . $conn->error;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($resultData);
?>

