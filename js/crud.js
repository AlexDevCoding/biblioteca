document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('dataTable');

    table.addEventListener('click', (e) => {
        if (e.target.closest('.edit')) {
            editRow(e.target.closest('button'));
        } else if (e.target.closest('.delete')) {
            deleteRow(e.target.closest('button'));
        }
    });

    function editRow(button) {
        const row = button.closest('tr');
        const cells = row.querySelectorAll('td:not(.activo)');

        if (button.textContent.trim() === 'edit') {
            cells.forEach(cell => {
                const input = document.createElement('input');
                input.value = cell.textContent;
                cell.textContent = '';
                cell.appendChild(input);
            });
            button.innerHTML = '<span class="material-symbols-outlined">save</span>';
        } else {
            cells.forEach(cell => {
                const input = cell.querySelector('input');
                cell.textContent = input.value;
            });
            button.innerHTML = '<span class="material-symbols-outlined">edit</span>';
        }
    }

    function deleteRow(button) {
        const row = button.closest('tr');
        row.remove();
    }
});
