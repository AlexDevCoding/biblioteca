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
            mostrarModal("Felicidades", "Su estudiante ha sido registrado!", "success");
        } else {
            mostrarModal("Inconveniente", "Hubo un error. Esta Cédula ya se encuentra registrada", "error");
        }
    })
    .catch(error => {
        mostrarModal("Inconveniente", "Hubo un Inconveniente. Esta Cédula ya se encuentra registrada", "error");
    });
});

function mostrarModal(title, message, type) {
    const modal = document.getElementById("modal-registro-exitoso");
    const span = document.createElement("span");
    span.className = "cerrar";
    span.innerHTML = "&times;";

    const modalContent = document.querySelector(".modal-contenido");


    let icon = "";
    let iconClass = "";

    if (type === "success") {
        icon = "check_circle";
        iconClass = "icono-exito"; 
    } else if (type === "error") {
        icon = "error";
        iconClass = "icono-error"; 
    }

    modalContent.innerHTML = `
        <div class="modal-icono ${iconClass}"><span class="material-symbols-outlined">${icon}</span></div>
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
