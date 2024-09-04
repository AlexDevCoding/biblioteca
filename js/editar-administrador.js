document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-registro');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(form);

        fetch('../obtener-datos-administrador.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result); 
        })
        .catch(error => console.error('Error al actualizar los datos:', error));
    });


    fetch('../editar-administrador.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al cargar los datos:', data.error);
                return;
            }

     
            document.getElementById('usuario-id').value = data.id;
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            document.getElementById('usuario').value = data.usuario;
            document.getElementById('correo').value = data.correo;
            document.getElementById('contrasena').value = ''; 
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
