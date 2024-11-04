import React, { useEffect, useState } from 'react'
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
import { useGeneral } from '../hooks/useGeneral';
import * as Yup from "yup"
import { employeeType, CreateEmployeesErrors, employeeFilterType } from '../utils/types/employeeType';
import { employeeSchema } from '../schemas/employeeSchema';

const EmployeesModule = () => {

  const { getAllEmployees, employees, createEmployee } = useEmployees();
  const { states, countries, positions, getAllPositions, getAllStates, getAllCountries } = useGeneral();

  useEffect(() => {
    getAllEmployees(true);
    getAllStates();
    getAllCountries();
    getAllPositions()
  }, [])

  const [createFormStates,setCreateFormStates] = useState<Array<any>>([]);
  const [filterFormStates,setFilterFormStates] = useState<Array<any>>([]);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [createErrors, setCreateErrors] = useState<CreateEmployeesErrors>({});
  const [createData, setCreateData] = useState<employeeType>({
    name: '',
    phone: '',
    email: '',
    dni: null,
    hiringDate: null,
    salary: null,
    country: null,
    state: null,
    position: null
  });

  const [filterData, setFilterData] = useState<employeeFilterType>({
    name: '',
    dni: '',
    salary: '',
    country: '',
    state: '',
  });
  
  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(employees.length / dataLength);
  const dataShown = employees.slice(indexStart, indexEnd);

  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

  const handleCreateSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const state = states.find(s => s.id == createData.state);
      await employeeSchema.validate(createData, { abortEarly: false });
      createEmployee(createData)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const createErrors: CreateEmployeesErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createErrors[error.path as keyof CreateEmployeesErrors] = error.message;
        });

        setCreateErrors(createErrors);
        console.log(createErrors);

      }
    }
  }

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nombre: filterData.name,
      dni: filterData.dni,
      sueldo: filterData.salary,
      Provincias_id: filterData.state,
    }

    const datos = Object.entries(data);
    if (datos.length == 2) return;

    const filter: Array<string> = []
    datos.forEach((d, index) => {
      if (d[1] != "" && index == 0) {
        if (d[0] == "Provincias_id" || d[0] == "sueldo" || d[0] == "dni") {
          filter.push(`?${d[0]}=${d[1]}`);
        } else {
          filter.push(`?${d[0]}[contains]=${d[1]}`)
        }
      } else if (d[1] != "") {
        if (d[0] == "Provincias_id" || d[0] == "sueldo" || d[0] == "dni") {
          filter.push(`&${d[0]}=${d[1]}`);
        } else {
          filter.push(`&${d[0]}[contains]=${d[1]}`);
        }

      }
    })

    getAllEmployees(true,false,filter.join(""));
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setCreateFormStates(statesAvailables)
    }
    setCreateData({
      ...createData,
      [name]: value
    });
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setFilterFormStates(statesAvailables)
    }
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
              <Input id={"nombre"} name={"name"} value={createData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleCreateChange} error={createErrors.name}></Input>
              <Input id={"correo"} name={"email"} value={createData.email} title={"Email"} type={"text"} placeholder={"username@gmail.com"} onChange={handleCreateChange} error={createErrors.email}></Input>
              <Input id={"dni"} name={"dni"} value={createData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleCreateChange} error={createErrors.dni}></Input>
              <Input id={"telefono"} name={"phone"} value={createData.phone} title={"Telefono"} type={"text"} placeholder={"+3814848949"} onChange={handleCreateChange} error={createErrors.phone}></Input>
              <Input id={"fechaContratacion"} name={"hiringDate"} value={createData.hiringDate} title={"Fecha de contratacion"} type={"text"} placeholder={"2024-09-30 14:30:14"} onChange={handleCreateChange} error={createErrors.hiringDate}></Input>
              <Input id={"salario"} name={"salary"} value={createData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleCreateChange} error={createErrors.salary}></Input>
              <Select id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleCreateChange} error={createErrors.country}></Select>
              <Select id={"provincia"} title={"Provincia"} name={"state"} options={createFormStates} onChange={handleCreateChange} error={createErrors.state}></Select>
              <Select id={"puesto"} title={"Puesto"} name={"positions"} options={positions} onChange={handleCreateChange} error={createErrors.position}></Select>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreFiltrar"} name={"name"} value={filterData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleFilterChange} error=''></Input>
              <Input id={"dniFiltrar"} name={"dni"} value={filterData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleFilterChange} error=''></Input>
              <Input id={"salarioFiltrar"} name={"salary"} value={filterData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleFilterChange} error=''></Input>
              <Select id={"paisesFiltrar"} title={"País"} name={"country"} options={countries} onChange={handleFilterChange}></Select>
              <Select id={"provinciaFiltrar"} title={"Provincia"} name={"state"} options={filterFormStates} onChange={handleFilterChange}></Select>
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
                  <TRow key={index} id={empleado.id} detail={true} path='employees'>
                    <TData checkbox={true}>{empleado.nombre}</TData>
                    <TData>{empleado.correo ? empleado.correo : "-"}</TData>
                    <TData>{empleado.dni ? empleado.dni : "-"}</TData>
                    <TData>{empleado.sueldo ? `$${empleado.sueldo}` : "-"}</TData>
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