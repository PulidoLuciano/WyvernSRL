import React, { useEffect, useState } from 'react'
import { optionsCountries, optionsProducts } from '../utils/dataArrays'
import Accordion from '../components/Accordion';
import Pagination from '../components/Pagination';
import Nav from '../components/Nav'
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import SaveButton from '../components/form/SaveButton';
import FilterButton from '../components/form/FilterButton';
import Table from '../components/table/Table';
import TData from '../components/table/TData';
import TRow from '../components/table/TRow';
import { thead } from '../utils/types/TableInterfaces';
import { useAuth } from '../context/authContext';


const SalesModule = () => {

  const {getAllSales,sales,clients,products} = useAuth()
  useEffect(()=>{
    getAllSales()
  },[])

  console.log(sales);
  
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createData, setCreateData] = useState({
    username: '',
    product: '',
    date: '',
  });

  const [filterData, setFilterData] = useState({
    username: '',
    product: '',
    date: '',
  });

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(sales.length / dataLength);
  const dataShown = sales.slice(indexStart, indexEnd);
  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll)
}

  //********
  const clientTableHeaders: Array<thead> = [
    {
      title: "Nombre de Usuario",
      checkbox: true,
    },
    {
      title: "Producto"
    },
    {
      title: "Fecha"
    }
  ]

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(createData);
  }

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filterData);
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value
    });
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value
    });
  }

  return (
    <main className='w-full flex '>
      <Nav />
      <div className='ms-72 p-8'>
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Ventas</h1>
          <p>Ver, crear, editar y eliminar Ventas</p>
        </div>

        <Accordion title="Crear Nuevo">
            <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
              <>
                <Input id={"nombreUsuario"} name={"username"} value={createData.username} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleCreateChange} error=''></Input>                
                <Select id={"productos"} title={"Productos"} name={"products"} options={optionsProducts} onChange={handleCreateChange}></Select>               
                <Input id={"fecha"} name={"date"} value={createData.date} title={"Fecha"} type={"text"} placeholder={"2023-07-17"} onChange={handleCreateChange} error=''></Input>
                <SaveButton/>
              </>  
            </Form>
        </Accordion>
        <Accordion title="Filtrar por">
            <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
              <>
                <Input id={"nombreUsuario"} name={"username"} value={filterData.username} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleFilterChange} error=''></Input>                
                <Select id={"productos"} title={"Productos"} name={"products"} options={optionsProducts} onChange={handleFilterChange}></Select>               
                <Input id={"fecha"} name={"date"} value={filterData.date} title={"Fecha"} type={"text"} placeholder={"2023-07-17"} onChange={handleFilterChange} error=''></Input>
                <FilterButton/>
              </>  
            </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Ventas</h2>
            <p>Página 1 de 20</p>
          </div>

          <button className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados (0)
          </button>

        </div>

        <div className='overflow-x-auto mt-6'>
         <Table onChange={handleSelectAll} selectedAll={selectedAll} headers={clientTableHeaders}>
            {
              dataShown.map((sale, index) => {
                return (
                  <TRow key={index}>
                    <TData selectedAll={selectedAll} checkbox={true}>{clients.map((c) => c.id == sale.Clientes_id? c.nombre : "")}</TData>
                    <TData>{sale.product}</TData>
                    <TData>{sale.fecha}</TData>
                  </TRow>)
              })
            }

          </Table>

        </div>


        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

          <Pagination changePage={changePage} nPages={nPages} currentPage={currentPage} indexStart={indexStart} indexEnd={indexEnd} />

        </div>
      </div>


    </main>
  )
}

export default SalesModule