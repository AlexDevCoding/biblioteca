document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const limit = 10; 
    const maxPageButtons = 3; 

    function fetchData(page) {
        fetch(`../listar-estudiantes.php?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('data-container');
                if (data.students.length === 0) {
                    container.innerHTML = '<p>No hay datos disponibles.</p>';
                    return;
                }

                let tableHTML = `
                    <input type="text" id="searchInput" placeholder="Buscar..." style="margin-bottom: 20px;" class="buscar">
                    <table id="dataTable" class="zebra-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Curso</th>
                                <th>Número de Teléfono</th>
                                <th>Fecha de Ingreso</th>
                                <th class="accion">Acción</th>
                            </tr>
                        </thead>
                        <tbody>`;

                data.students.forEach((row, index) => {
             
                    const id = (currentPage - 1) * limit + index + 1;

                    tableHTML += `
                        <tr>
                            <td>${id}</td>
                            <td>${row.cedula}</td>
                            <td>${row.nombre}</td>
                            <td>${row.apellido}</td>
                            <td>${row.curso}</td>
                            <td>${row.telefono}</td>
                            <td>${row.fecha_ingreso}</td>
                            <td class="activo">
                                <a href="editar-estudiantes.html?id=${row.id}"><button class="edit"><span class="material-symbols-outlined">edit</span></button></a>
                                <button class="delete" data-id="${row.id}"><span class="material-symbols-outlined">delete</span></button>
                            </td>
                        </tr>`;
                });

                tableHTML += '</tbody></table>';

                if (data.total_pages > 1) {
                    tableHTML += '<div id="pagination">';
                    for (let i = 1; i <= data.total_pages; i++) {
                        tableHTML += `<button class="page-button" data-page="${i}">${i}</button>`;
                    }
                    tableHTML += '</div>';
                }

                container.innerHTML = tableHTML;

                setupSearchFunctionality();
                setupPagination(data.total_pages);
                setupDeleteButtons(); 
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    function setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        const table = document.getElementById('dataTable');
        const rows = table.querySelectorAll('tbody tr');

        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            rows.forEach(row => {
                const cells = row.getElementsByTagName('td');
                let match = false;
                for (let i = 0; i < cells.length - 1; i++) { 
                    if (cells[i].innerText.toLowerCase().includes(query)) {
                        match = true;
                        break;
                    }
                }
                row.style.display = match ? '' : 'none';
            });
        });
    }

    function setupPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        const pageButtons = pagination.querySelectorAll('.page-button');

        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentPage = parseInt(button.getAttribute('data-page'));
                fetchData(currentPage);
            });
        });

        updatePaginationButtons(totalPages);
    }

    function updatePaginationButtons(totalPages) {
        const pagination = document.getElementById('pagination');
        const pageButtons = pagination.querySelectorAll('.page-button');
        
        pageButtons.forEach(button => button.style.display = 'none'); 

        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        pageButtons.forEach(button => {
            const pageNumber = parseInt(button.getAttribute('data-page'));
            if (pageNumber >= startPage && pageNumber <= endPage) {
                button.style.display = 'inline-block';
            }
        });

    
        pageButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.getAttribute('data-page')) === currentPage) {
                button.classList.add('active');
            }
        });
    }

    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 
                const id = button.getAttribute('data-id');
                const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este estudiante?");
                if (confirmDelete) {
                    fetch(`../eliminar-estudiantes.php?id=${id}`, { method: 'GET' })
                        .then(response => {
                            if (response.ok) {
                                fetchData(currentPage);
                            } else {
                                alert('Error al eliminar el estudiante');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }
            });
        });
    }

    fetchData(currentPage);
});
