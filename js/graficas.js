document.addEventListener('DOMContentLoaded', function () {
    fetch('../graficas.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error en la respuesta del servidor:', data.error);
                return;
            }

     
            var cursos = data.cursos;
            var cursoKeys = Object.keys(cursos);
            var cursoValues = Object.values(cursos);


            var chartContainer = document.getElementById('container');
            var chart = echarts.init(chartContainer, 'dark');
            var option = {
                title: {
                    text: 'Número de Estudiantes por Curso',
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    },
                    left: 'center',
                    top: '5%'
                },
                tooltip: {},
                legend: {
                    data: ['Número de Estudiantes'],
                    bottom: 0,
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    },
                    padding: [0, 0, 10, 0]
                },
                xAxis: {
                    type: 'category',
                    data: cursoKeys,
                    axisLabel: {
                        color: 'rgb(174, 185, 225)'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'rgb(174, 185, 225)'
                    }
                },
                series: [
                    {
                        name: 'Número de Estudiantes',
                        type: 'bar',
                        data: cursoValues,
                        itemStyle: {
                            color: '#61a0a8'
                        }
                    }
                ]
            };
            chart.setOption(option);

            var fechas = data.fechas;

            var meses = {};
            Object.keys(fechas).forEach(fecha => {
                var mes = new Date(fecha).toLocaleString('default', { month: 'long' });
                if (!meses[mes]) {
                    meses[mes] = 0;
                }
                meses[mes] += fechas[fecha];
            });

            var fechaKeys = Object.keys(meses).sort();
            var fechaValues = fechaKeys.map(mes => meses[mes]);


            var chartContainer2 = document.getElementById('contenedor');
            var chart2 = echarts.init(chartContainer2, 'dark');
            var option2 = {
                title: {
                    text: 'Número de Estudiantes por Mes',
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    },
                    left: 'center',
                    top: '5%'
                },
                tooltip: {},
                legend: {
                    data: ['Número de Estudiantes'],
                    bottom: 0,
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    },
                    padding: [0, 0, 10, 0]
                },
                xAxis: {
                    type: 'category',
                    data: fechaKeys,
                    axisLabel: {
                        color: 'rgb(174, 185, 225)'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'rgb(174, 185, 225)'
                    }
                },
                series: [{
                    name: 'Número de Estudiantes',
                    type: 'line',
                    data: fechaValues,
                    itemStyle: {
                        color: '#61a0a8'
                    }
                }]
            };
            chart2.setOption(option2);

     
            var graficoCursos = data.graficoCursos;
            var pieKeys = graficoCursos.categories;
            var pieValues = graficoCursos.data;

         
            var chartContainer3 = document.getElementById('courses-chart');
            var chart3 = echarts.init(chartContainer3, 'dark');
            var option3 = {
                title: {
                    text: 'Distribución de Estudiantes por Curso',
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    },
                    left: 'center',
                    top: '5%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: pieKeys,
                    textStyle: {
                        color: 'rgb(174, 185, 225)'
                    }
                },
                series: [
                    {
                        name: 'Número de Estudiantes',
                        type: 'pie',
                        radius: '50%',
                        data: pieKeys.map((key, index) => ({ value: pieValues[index], name: key })),
                        emphasis: {
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    }
                ]
            };
            chart3.setOption(option3);

           
            function renderStudentChart(data) {
                const dom = document.getElementById('total-students-chart');
                if (!dom) {
                    console.error('Elemento con id "total-students-chart" no encontrado.');
                    return;
                }
                const myChart = echarts.init(dom, 'dark', {
                    renderer: 'canvas',
                    useDirtyRect: false
                });
            
                const option = {
                    title: {
                        text: 'Total de Estudiantes',
                        textStyle: {
                           color: 'rgb(174, 185, 225)'
                        },
                        left: 'center',
                        top: '5%'
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
            }

        
            renderStudentChart({
                total_students: data.total_students || 0, 
                students_this_week: data.students_this_week || 0,
                students_this_month: data.students_this_month || 0
            });

        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
});
