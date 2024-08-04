document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    if (studentId) {
        fetch(`../editar-estudiantes.php?id=${studentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const student = data.student;
                    document.getElementById('studentId').value = student.id;
                    document.getElementById('cedula').value = student.cedula;
                    document.getElementById('nombre').value = student.nombre;
                    document.getElementById('apellido').value = student.apellido;
                    document.getElementById('telefono').value = student.telefono;
                    document.getElementById('fecha_ingreso').value = student.fecha_ingreso;
                    document.getElementById('curso').value = student.curso;
                } else {
                    alert('Error al cargar los datos del estudiante');
                }
            })
            .catch(error => console.error('Error al cargar los datos del estudiante:', error));
    }
});

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'estudiantes.html';
        } else {
            alert('Error al editar el estudiante');
        }
    })
    .catch(error => console.error('Error:', error));
});