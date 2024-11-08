import { useEffect } from 'react'
import Nav from '../components/Nav'
import MonthSales from "../components/charts/MonthSales"
import CountrySales from "../components/charts/CountrySales"
import PlatformSales from "../components/charts/PlatformSales"
import ProductSales from "../components/charts/ProductSales"
import { useStats } from '../hooks/useStats'


const Stats = () => {

  const { getMonthSales, monthSales, getCountrySales, countrySales, getPlatformSales, platformSales, getProductSales, productSales} = useStats()

  useEffect(() => {
    getMonthSales()
    getCountrySales()
    getPlatformSales()
    getProductSales()
  }, [])
  
  return (
    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative'>
      
      
        <h1 className='text-4xl m-10'>Estadisticas de venta</h1>       
        <MonthSales data={monthSales}/>  
        <CountrySales data={countrySales}/>  
        <PlatformSales data={platformSales}></PlatformSales>
        <ProductSales data={productSales}></ProductSales>
     

      
    </main>
  )
}

export default Stats