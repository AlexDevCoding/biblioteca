document.getElementById("formulario-registro").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarModal("Success", "Your account was registered!");
        } else {
            mostrarModal("Error", "There was an error. Please try again.");
        }
    })
    .catch(error => {
        mostrarModal("Error", "There was an error. Please try again.");
    });
});

function mostrarModal(title, message) {
    const modal = document.getElementById("modal-registro-exitoso");
    const span = document.createElement("span");
    span.className = "cerrar";
    span.innerHTML = "&times;";

    const modalContent = document.querySelector(".modal-contenido");

    modalContent.innerHTML = `
        <div class="modal-icono"><span class="material-symbols-outlined">check_circle</span></div>
        <div class="modal-texto">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    modalContent.appendChild(span);

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
