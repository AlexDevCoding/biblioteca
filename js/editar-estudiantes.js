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

                 
                    const originalData = document.getElementById('originalData');
                    originalData.dataset.originalCedula = student.cedula;
                    originalData.dataset.originalNombre = student.nombre;
                    originalData.dataset.originalApellido = student.apellido;
                    originalData.dataset.originalTelefono = student.telefono;
                    originalData.dataset.originalFechaIngreso = student.fecha_ingreso;
                    originalData.dataset.originalCurso = student.curso;
                } else {
                    mostrarModal('Error', 'Error al cargar los datos del estudiante', 'error');
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos del estudiante:', error);
                mostrarModal('Error', 'Se produjo un error al cargar los datos del estudiante', 'error');
            });
    }
});

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const originalData = document.getElementById('originalData').dataset;
    const originalCedula = originalData.originalCedula;
    const originalNombre = originalData.originalNombre;
    const originalApellido = originalData.originalApellido;
    const originalTelefono = originalData.originalTelefono;
    const originalFechaIngreso = originalData.originalFechaIngreso;
    const originalCurso = originalData.originalCurso;


    const formCedula = document.getElementById('cedula').value;
    const formNombre = document.getElementById('nombre').value;
    const formApellido = document.getElementById('apellido').value;
    const formTelefono = document.getElementById('telefono').value;
    const formFechaIngreso = document.getElementById('fecha_ingreso').value;
    const formCurso = document.getElementById('curso').value;

    if (
        formCedula === originalCedula &&
        formNombre === originalNombre &&
        formApellido === originalApellido &&
        formTelefono === originalTelefono &&
        formFechaIngreso === originalFechaIngreso &&
        formCurso === originalCurso
    ) {
        mostrarModal('Error', 'No se han editado los datos', 'error');
        return; 
    }

    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarModal('Éxito', 'Estudiante editado con éxito', 'success', () => {
                window.location.href = 'estudiantes.html'; 
            });
        } else {
            const errorMessage = data.message || 'Error al editar el estudiante';
            mostrarModal('Error', errorMessage, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarModal('Error', 'Se produjo un error al intentar editar el estudiante', 'error');
    });
});

function mostrarModal(title, message, type, callback) {
    const modal = document.getElementById("modal-registro-exitoso");
    const span = document.querySelector("#modal-registro-exitoso .cerrar");
    const modalContent = document.querySelector("#modal-registro-exitoso .modal-contenido p");

    let icon = "";
    let iconClass = "";

    if (type === "success") {
        icon = "ti ti-circle-check"; 
        iconClass = "icono-exito"; 
    } else if (type === "error") {
        icon = "ti ti-alert-circle"; 
        iconClass = "icono-error"; 
    }


    modalContent.innerHTML = `
        <div class="modal-icono ${iconClass}"><i class="${icon}"></i></div>
        <div class="modal-texto">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    modal.style.display = "block";


    span.onclick = function() {
        modal.style.display = "none";
        if (callback) callback();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            if (callback) callback();
        }
    }
}

