import ReactEcharts from 'echarts-for-react';
import ChartProps from '../../utils/types/ChartInterface';

const PlatformSales = ( {data}: ChartProps ) => {
  // Datos de ejemplo
  const plataformas = data.map( d => d.nombre_plataforma);
  const ventas = data.map( d => d.cantidad_productos_vendidos);

  // Opciones de configuración para ECharts
  const opciones = {
    title: { text: 'Distribución de Ventas de Juegos por Plataforma', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: plataformas.map((plataforma, i) => ({ value: ventas[i], name: plataforma })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactEcharts className='p-6 my-10' option={opciones} style={{ height: 400, width: '120%' }} />;
};

export default PlatformSales;
