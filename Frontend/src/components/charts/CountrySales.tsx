import ReactEcharts from 'echarts-for-react';
import ChartProps from '../../utils/types/ChartInterface';

const CountrySales = ( {data}: ChartProps) => {
  const paises = data.map( d => d.nombre_pais);
  const ventas = data.map( d => d.cantidad_ventas);

  const opciones = {
    title: { text: 'Ventas de Juegos por País', left: 'center' },
    tooltip: { trigger: 'axis' },
    yAxis: {
      type: 'category',
      data: paises,
      axisLabel: { rotate: 0 },
    },
    xAxis: { 
      type: 'value', 
      name: 'Juegos Vendidos' 
    },
    series: [
      {
        data: ventas,
        type: 'bar',
        color: '#806FB6',
        barWidth: '60%',
      },
    ],
  };

  return <ReactEcharts className=' my-10' option={opciones} style={{ height: 500, width: '120%' }} />;
};

export default CountrySales;
