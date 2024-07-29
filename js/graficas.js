document.addEventListener('DOMContentLoaded', function () {
    fetch('../graficas.php')
        .then(response => response.json())
        .then(data => {
            const categories = data.map(item => item.curso);
            const counts = data.map(item => parseInt(item.count, 10));

            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Número de Estudiantes por Curso'
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: 'Número de Estudiantes',
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Número de Estudiantes'
                    }
                },
                series: [{
                    name: 'Numero de estudiantes',
                    data: counts,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    enabled: false
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});