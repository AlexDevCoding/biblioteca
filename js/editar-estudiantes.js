document.addEventListener('DOMContentLoaded', function() {
        // Suponiendo que el ID del estudiante se pasa en la URL como parámetro
        const params = new URLSearchParams(window.location.search);
        const estudianteId = params.get('id');

        if (estudianteId) {
            // Hacer una solicitud para obtener los datos del estudiante
            fetch(`../actualizar-estudiante.php?id=${estudianteId}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('estudiante-id').value = data.id;
                    document.getElementById('cedula').value = data.cedula;
                    document.getElementById('nombre').value = data.nombre;
                    document.getElementById('apellido').value = data.apellido;
                    document.getElementById('telefono').value = data.telefono;
                    document.getElementById('fecha').value = data.fecha;
                    document.getElementById('opciones').value = data.curso;
                })
                .catch(error => console.error('Error:', error));
        }
    });

