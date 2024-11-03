import React, { useEffect, useState } from 'react'
import { optionsStates } from '../utils/dataArrays'
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
import { employeeTableHeaders } from "../utils/dataArrays"
import { useEmployees } from '../hooks/useEmployees';

const EmployeesModule = () => {

  const { getAllEmployees, employees } = useEmployees();


  useEffect(() => {
    getAllEmployees(true)

  }, [])

  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createData, setCreateData] = useState({
    name: '',
    phone: '',
    email: '',
    dni: '',
    hiringDate: '',
    salary: '',
    state: ''
  });

  const [filterData, setFilterData] = useState({
    name: '',
    phone: '',
    email: '',
    dni: '',
    hiringDate: '',
    salary: '',
    state: ''
  });

  
  
  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(employees.length / dataLength);
  const dataShown = employees.slice(indexStart, indexEnd);

  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

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
          <h1 className='text-4xl'>Modulo Empleados</h1>
          <p>Ver, crear, editar y eliminar Empleados</p>
        </div>

        <Accordion title="Crear Nuevo">
          <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-4 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"nombre"} name={"name"} value={createData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleCreateChange} error=''></Input>
              <Input id={"correo"} name={"email"} value={createData.email} title={"Email"} type={"text"} placeholder={"username@gmail.com"} onChange={handleCreateChange} error=''></Input>
              <Input id={"dni"} name={"dni"} value={createData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleCreateChange} error=''></Input>
              <Input id={"telefono"} name={"phone"} value={createData.phone} title={"Telefono"} type={"text"} placeholder={"+3814848949"} onChange={handleCreateChange} error=''></Input>
              <Input id={"fechaContratacion"} name={"hiringDate"} value={createData.hiringDate} title={"Fecha de contratacion"} type={"text"} placeholder={"2024-09-30 14:30:14"} onChange={handleCreateChange} error=''></Input>
              <Input id={"salario"} name={"salary"} value={createData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleCreateChange} error=''></Input>
              <Select id={"provincia"} title={"Provincia"} name={"state"} options={optionsStates} onChange={handleCreateChange}></Select>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombre"} name={"name"} value={filterData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleFilterChange} error=''></Input>
              <Input id={"correo"} name={"email"} value={filterData.email} title={"Email"} type={"text"} placeholder={"username@gmail.com"} onChange={handleFilterChange} error=''></Input>
              <Input id={"dni"} name={"dni"} value={filterData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleFilterChange} error=''></Input>
              <Input id={"telefono"} name={"phone"} value={filterData.phone} title={"Telefono"} type={"text"} placeholder={"+3814848949"} onChange={handleFilterChange} error=''></Input>
              <Input id={"fechaContratacion"} name={"hiringDate"} value={filterData.hiringDate} title={"Fecha de contratacion"} type={"text"} placeholder={"2024-09-30 14:30:14"} onChange={handleFilterChange} error=''></Input>
              <Input id={"salario"} name={"salary"} value={filterData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleFilterChange} error=''></Input>
              <Select id={"provincia"} title={"Provincia"} name={"state"} options={optionsStates} onChange={handleCreateChange}></Select>
              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Empleados</h2>
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
          <Table headers={employeeTableHeaders}>
            {
              dataShown.map((empleado, index) => {
                return (
                  <TRow key={index} id={empleado.dni} detail={true}>
                    <TData checkbox={true}>{empleado.nombre}</TData>
                    <TData>{empleado.correo ? empleado.correo : "-"}</TData>
                    <TData>{empleado.dni ? empleado.dni : "-"}</TData>
                    <TData>{empleado.telefono ? empleado.telefono : "-"}</TData>
                    <TData>{empleado.fechaContratacion ? empleado.fechaContratacion : "-"}</TData>
                    <TData>{empleado.sueldo ? empleado.sueldo : "-"}</TData>
                    <TData>{empleado.Provincias?.nombre }</TData>
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

export default EmployeesModule