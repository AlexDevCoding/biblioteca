document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const limit = 10; 
    const maxPageButtons = 3; 
    let searchQuery = '';
    let debounceTimer;

    function fetchData(page) {
        const query = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
        const paginationButtons = document.querySelectorAll('.page-button');
        const deleteButtons = document.querySelectorAll('.delete');

        paginationButtons.forEach(button => button.disabled = true);
        deleteButtons.forEach(button => button.disabled = true);

        fetch(`../listar-estudiantes.php?page=${page}&${query}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('data-container');
                const tableBody = document.getElementById('dataTableBody');
                
                if (!tableBody) {
                    container.innerHTML = `
                            <div class="search-container">
                            <input type="text" id="searchInput" placeholder="Buscar..." value="${searchQuery}" class="buscar">
                            <span class="search-icon material-symbols-outlined">search</span>
                        </div>
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
                            <tbody id="dataTableBody"></tbody>
                        </table>
                        <div id="pagination"></div>
                    `;
                }

                const tbody = document.getElementById('dataTableBody');
                tbody.innerHTML = '';

                if (data.students.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="8">No hay datos disponibles.</td></tr>';
                } else {
                    data.students.forEach((row, index) => {
                        const id = (currentPage - 1) * limit + index + 1;

                        tbody.innerHTML += `
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
                }

                const pagination = document.getElementById('pagination');
                pagination.innerHTML = '';
                if (data.total_pages > 1) {
                    for (let i = 1; i <= data.total_pages; i++) {
                        pagination.innerHTML += `<button class="page-button" data-page="${i}">${i}</button>`;
                    }
                }

                setupSearchFunctionality();
                setupPagination(data.total_pages);
                setupDeleteButtons(); 

                paginationButtons.forEach(button => button.disabled = false);
                deleteButtons.forEach(button => button.disabled = false);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                document.getElementById('data-container').innerHTML = '<p>Ocurrió un error al cargar los datos. Por favor, intente nuevamente.</p>';
                paginationButtons.forEach(button => button.disabled = false);
                deleteButtons.forEach(button => button.disabled = false);
            });
    }

    function setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer); 
            debounceTimer = setTimeout(() => {
                searchQuery = searchInput.value.trim().toLowerCase();
                currentPage = 1;
                fetchData(currentPage);
            }, 300);
        });
    }

    function setupPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        pagination.querySelectorAll('.page-button').forEach(button => {
            button.addEventListener('click', function() {
                currentPage = parseInt(button.getAttribute('data-page'));
                fetchData(currentPage);
            });
        });
        updatePaginationButtons(totalPages);
    }

    function updatePaginationButtons(totalPages) {
        const pageButtons = document.querySelectorAll('.page-button');
        
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
            button.classList.toggle('active', pageNumber === currentPage);
        });
    }

    function setupDeleteButtons() {
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 
                const id = button.getAttribute('data-id');
                if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
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
