document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current Page:', currentPage);

 
    document.querySelectorAll('aside nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });

 
    function updateStats() {
        fetch('../graficas-index.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('student-count').innerHTML = `<p class="estudiantes-estadisticas">Total de estudiantes: <span>${data.total_students}</span></p>`;
            document.getElementById('students-this-week').innerHTML = `<p class="estudiantes-estadisticas">Estudiantes ingresados esta semana: <span>${data.students_this_week}</span></p>`;
            document.getElementById('students-this-month').innerHTML = `<p class="estudiantes-estadisticas">Estudiantes ingresados este mes: <span>${data.students_this_month}</span></p>`;
            renderStudentChart(data);
            renderCourseChart(data);
        })
        .catch(error => console.error('Error:', error));
    }

    function renderStudentChart(data) {
        const dom = document.getElementById('linea');
        const myChart = echarts.init(dom, 'dark');

        const option = {
            title: {
                text: 'Número de Estudiantes',
                left: 'center',
                top: '10',
                textStyle: {
                 color: 'rgb(174, 185, 225)'
                }
            },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            xAxis: {
                type: 'category',
                data: ['Total', 'Esta Semana', 'Este Mes'],
                axisLabel: { color: '#fff' },
                axisLine: { lineStyle: { color: '#ddd' } }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: '#fff' },
                axisLine: { lineStyle: { color: '#ddd' } }
            },
            series: [{
                name: 'Número de Estudiantes',
                type: 'line',
                data: [data.total_students, data.students_this_week, data.students_this_month],
                itemStyle: { color: '#73c0de' },
                emphasis: { itemStyle: { color: '#409EFF' } },
                label: { show: true, position: 'top', color: '#fff' }
            }]
        };

        myChart.setOption(option);

        window.addEventListener('resize', () => myChart.resize());
    }


function renderCourseChart(data) {
    const dom = document.getElementById('circulo');
    const myChart = echarts.init(dom, 'dark');

    const option = {
        title: {
            text: 'Categorías de Cursos',
            left: 'center',
            top: 10,
            textStyle: {
                  color: 'rgb(174, 185, 225)'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const total = data.course_categories.reduce((sum, category) => sum + category.count, 0);
                const percentage = ((params.value / total) * 100).toFixed(2);
                return `${params.name}: ${params.value} (${percentage}%)`;
            }
        },
        legend: { 
            bottom: '5%', 
            left: 'center', 
            textStyle: { color: '#fff' } 
        },
        series: [
            {
                name: 'Categorías de Cursos',
                type: 'pie',
                radius: '50%',
                data: data.course_categories.map(category => ({
                    value: category.count,
                    name: category.category
                })),
                emphasis: {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                label: {
                    color: '#fff'
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => myChart.resize());
}


    updateStats();
});
