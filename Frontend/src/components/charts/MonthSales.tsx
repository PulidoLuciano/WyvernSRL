import ReactEcharts from 'echarts-for-react';
import ChartProps from '../../utils/types/ChartInterface';

const MonthSales = ( {data}: ChartProps ) => {

  const meses = data.map( d => d.mes_anio);
  
  const ventas = data.map(d => d.cantidad_ventas);

  const opciones = {
    title: {
      text: 'Ventas de Juegos por Mes',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: meses,
    },
    yAxis: {
      type: 'value',
      name: 'Juegos Vendidos',
    },
    series: [
      {
        data: ventas,
        type: 'line',
        color: '#463772',
        barWidth: '60%',
      },
    ],
  };

  return (
    <div>
      <ReactEcharts className='my-10' option={opciones} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default MonthSales;
