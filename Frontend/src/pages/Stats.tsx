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
    <main className='w-full flex'>
      <Nav />
      <div className='ms-72 w-4/6'>
        <h1 className='text-4xl m-10'>Estadisticas de venta</h1>       
        <MonthSales data={monthSales}/>  
        <CountrySales data={countrySales}/>  
        <PlatformSales data={platformSales}></PlatformSales>
        <ProductSales data={productSales}></ProductSales>
      </div>    

      
    </main>
  )
}

export default Stats