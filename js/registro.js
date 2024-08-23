document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);

    fetch('../app.php', { 
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.status === 'error') {
            mostrarModal('Inconveniente', data.message, 'error'); 
        } else {
            mostrarModal('Éxito', 'Registro exitoso. Puedes iniciar sesión.', 'success');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarModal('Error', 'Hubo un problema con la solicitud.', 'error');
    });
});

function mostrarModal(title, message, type) {
    const modal = document.getElementById("modal");
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.querySelector(".modal-icono");

    if (!modalTitle || !modalMessage || !modalIcon) {
        console.error('One or more modal elements not found');
        return;
    }

    let iconClass = "";
    let icon = "";

    if (type === "success") {
        icon = "ti ti-circle-check"; 
        iconClass = "icono-exito"; 
    } else if (type === "error") {
        icon = "ti ti-alert-circle"; 
        iconClass = "icono-error"; 
    }

 
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.innerHTML = `<i class="${icon}" style="font-size: 26px;"></i>`;
    modalIcon.className = `modal-icono ${iconClass}`;


    modal.style.display = "block";

    const closeButton = document.getElementById("modalClose");
    if (closeButton) {
        closeButton.onclick = function() {
            modal.style.display = "none";
        }
    }

   
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
