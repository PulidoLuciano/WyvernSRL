import React, { useState } from 'react'
import { suppliers, optionsCountries, optionsPlatforms, optionsStates } from '../utils/dataArrays'
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


const SuppliersModule = () => {

  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createData, setCreateData] = useState({
    name: '',
    state: '',
    country: '',
    category: '',
    cbu: 0,
    paymentMethod: '',
    qualification: 0,
  });

  const [filterData, setFilterData] = useState({
    name: '',
    state: '',
    country: '',
    category: '',
    cbu: 0,
    paymentMethod: '',
    qualification: 0,
  });

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(suppliers.length / dataLength);
  const dataShown = suppliers.slice(indexStart, indexEnd);
  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll)
}

  //********
  const clientTableHeaders: Array<thead> = [
    {
      title: "Nombre",
      checkbox: true,
    },
    {
      title: "Pais"
    },
    {
      title: "Provincia"
    },
    {
      title: "Categoria"
    },
    {
      title: "CBU"
    },
    {
      title: "Metodo de Pago"
    },
    {
      title:"Calificacion"
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
          <h1 className='text-4xl'>Modulo Proveedores</h1>
          <p>Ver, crear, editar y eliminar Proveedores</p>
        </div>

        <Accordion title="Crear Nuevo">
            <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
              <>
                <Input id={"nombreProveedor"} name={"name"} value={createData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleCreateChange}></Input>                
                <Select id={"paises"} title={"País"} name={"country"} options={optionsCountries} onChange={handleCreateChange}></Select>
                <Select id={"provincias"} name={"state"} title={"Provincia"} options={optionsStates} onChange={handleCreateChange}></Select>                
                <Input id={"cbu"} name={"cbu"} value={createData.cbu} title={"CBU"} type={"number"} placeholder={"4516161561651651"} onChange={handleCreateChange}></Input>
                <Input id={"metodoPago"} name={"paymentMethod"} value={createData.paymentMethod} title={"Metodo de Pago"} type={"text"} placeholder={"Efectivo"} onChange={handleCreateChange}></Input>
                <Input id={"calificacion"} name={"qualification"} value={createData.qualification} title={"Calificacion"} type={"number"} placeholder={"0-5"} onChange={handleCreateChange}></Input>
                <SaveButton/>
              </>  
            </Form>
        </Accordion>
        <Accordion title="Filtrar por">
            <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
              <>
                <Input id={"nombreProveedor"} name={"name"} value={filterData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange}></Input>                
                <Select id={"paises"} title={"País"} name={"country"} options={optionsCountries} onChange={handleFilterChange}></Select>
                <Select id={"provincias"} name={"state"} title={"Provincia"} options={optionsStates} onChange={handleFilterChange}></Select>                
                <Input id={"cbu"} name={"cbu"} value={filterData.cbu} title={"Pais"} type={"number"} placeholder={"4516161561651651"} onChange={handleFilterChange}></Input>
                <Input id={"metodoPago"} name={"paymentMethod"} value={filterData.paymentMethod} title={"Metodo de Pago"} type={"text"} placeholder={"Efectivo"} onChange={handleFilterChange}></Input>
                <Input id={"calificacion"} name={"qualification"} value={filterData.qualification} title={"Calificacion"} type={"number"} placeholder={"0-5"} onChange={handleFilterChange}></Input>
                <FilterButton/>
              </>  
            </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Proveedores</h2>
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
              dataShown.map(cliente => {
                return (
                  <TRow>
                    <TData selectedAll={selectedAll} checkbox={true}>{cliente.name}</TData>
                    <TData>{cliente.country}</TData>
                    <TData>{cliente.state}</TData>
                    <TData>{cliente.category}</TData>
                    <TData>{cliente.cbu}</TData>
                    <TData>{cliente.paymentMethod}</TData>
                    <TData>{cliente.cualification}</TData>
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

export default SuppliersModule