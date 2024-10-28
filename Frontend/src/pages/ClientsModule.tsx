import React, { useEffect, useState } from 'react'
import Accordion from '../components/Accordion';
import Pagination from '../components/Pagination';
import Nav from '../components/Nav'
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Checkbox from '../components/form/Checkbox';
import Select from '../components/form/Select';
import SaveButton from '../components/form/SaveButton';
import FilterButton from '../components/form/FilterButton';
import Table from '../components/table/Table';
import TData from '../components/table/TData';
import TRow from '../components/table/TRow';
import { thead } from '../utils/types/TableInterfaces';
import { useAuth } from '../context/authContext';
import { useForm } from 'react-hook-form';


const ClientsModule = () => {
  
  const {countries,platforms,clients,getAllClients,createClient} = useAuth();
 
  useEffect(()=>{
    getAllClients()
    
    
  },[])
  
  const {register,formState:{errors},reset} = useForm();
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createData, setCreateData] = useState({
    name: '',
    phone: '',
    email: '',
    platform: '',
    suscription: '',
    country: ''
  });

  const [filterData, setFilterData] = useState({
    name: '',
    phone: '',
    email: '',
    platform: '',
    suscription: '',
    country: ''
  });

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(clients.length / dataLength);
  const dataShown = clients.slice(indexStart, indexEnd);
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
      title: "Plataforma"
    },
    {
      title: "País"
    },
    {
      title: "Suscripto"
    },
    {
      title: "Correo"
    }
  ]

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(createData);
    
    createClient(createData);
  }

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filterData);
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name=="suscription"){
      setCreateData({
        ...createData,
        [name]: value=="on"? "true" : "false"
      })
    } else{
      setCreateData({
        ...createData,
        [name]: value
      });
    }
    
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
          <h1 className='text-4xl'>Modulo Clientes</h1>
          <p>Ver, crear, editar y eliminar clientes</p>
        </div>

        <Accordion title="Crear Nuevo">
            <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
              <>
                <Input id={"nombreCliente"} name={"name"} value={createData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleCreateChange}></Input>
                <Input id={"correo"} name={"email"} value={createData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleCreateChange}></Input>
                <Input id={"telefono"} name={"phone"} value={createData.phone} title={"Teléfono"} type={"number"} placeholder={"5493816341612"} onChange={handleCreateChange}></Input>
                <Select id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleCreateChange}></Select>
                <Checkbox title={"Suscripto"} name={"suscription"}  onChange={handleCreateChange}></Checkbox>
                <Select  id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleCreateChange}></Select>
                <SaveButton/>
              </>  
            </Form>
        </Accordion>
        <Accordion title="Filtrar por">
            <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
              <>
                <Input id={"nombreCliente"} name={"name"} value={filterData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange}></Input>
                <Input id={"correo"} name={"email"} value={filterData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleFilterChange}></Input>
                <Input id={"telefono"} name={"phone"} value={filterData.phone} title={"Teléfono"} type={"number"} placeholder={"5493816341612"} onChange={handleFilterChange}></Input>
                <Select id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleFilterChange}></Select>
                <Checkbox title={"Suscripto"} name={"suscription"}  onChange={handleFilterChange}></Checkbox>
                <Select id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleFilterChange}></Select>
                <FilterButton/>
              </>  
            </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Clientes</h2>
            <p>Página 1 de 20</p>
          </div>

          <button className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados (0)
          </button>

          <button className='bg-primary font-semibold laptopL:col-start-6 laptopL:col-end-7 rounded flex gap-2 items-center justify-center text-white'>
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            Enviar Noticia
          </button>
        </div>

        <div className='overflow-x-auto mt-6'>
         <Table onChange={handleSelectAll} selectedAll={selectedAll} headers={clientTableHeaders}>
            {
              dataShown.map((cliente,index) => {
                return (
                  <TRow key={index}>
                    <TData selectedAll={selectedAll} checkbox={true}>{cliente.nombre}</TData>
                    <TData>{platforms.map(p=>p.id==cliente.Plataformas_id? p.nombre : "")}</TData>
                    <TData>{countries.map(c => c.id == cliente.Paises_id? c.nombre : "")}</TData>
                    <TData>{cliente.suscription ? "Si" : "No"}</TData>
                    <TData>{cliente.correo}</TData>
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

export default ClientsModule