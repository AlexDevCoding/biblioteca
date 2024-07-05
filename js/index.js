document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tablero-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('tablero');
    });
    document.getElementById('estudiantes-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('estudiantes');
    });
    document.getElementById('estadisticas-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('estadisticas');
    });
    document.getElementById('configuracion-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('configuracion');
    });
    document.getElementById('cerrar-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('cerrar');
    });
});

function loadContent(page) {
    const content = document.getElementById('content');
    // Aquí puedes hacer una solicitud fetch para cargar el contenido dinámicamente.
    // Ejemplo:
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(error => {
            content.innerHTML = `<p>Error loading content: ${error}</p>`;
        });
}
