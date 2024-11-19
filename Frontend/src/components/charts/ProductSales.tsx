import ReactEcharts from 'echarts-for-react';
import ChartProps from '../../utils/types/ChartInterface';

const ProductSales = ( {data}: ChartProps ) => {

  const productos = data.map( d => d.nombre_producto);
  
  const ventas = data.map(d => d.cantidad_ventas);

  const opciones = {
    title: {
      text: 'Ventas de Juegos por Producto',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: productos,
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: 'value',
      name: 'Juegos Vendidos',
    },
    series: [
      {
        data: ventas,
        type: 'bar',
        color: '#463772',
        barWidth: '40%',
      },
    ],
  };

  return (
    <div>
      <ReactEcharts className='my-10' option={opciones} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default ProductSales;