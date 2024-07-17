



document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('dataTable');

    table.addEventListener('click', (e) => {
        if (e.target.closest('.delete')) {
            deleteRow(e.target.closest('button'));
        }
    });

    function deleteRow(button) {
        const row = button.closest('tr');
        row.remove();
    }
});
