document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    
    fetch('../login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            // Mostrar modal con el mensaje de error
            showModal('Error', data.message);
        } else {
            // Redirigir a la página de inicio
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});
