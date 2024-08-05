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
                    top: '5%',
                    bottom: '80%'
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
            // Procesar las fechas para extraer los meses
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
                    top: '5%',
                    bottom: '80%'
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
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});