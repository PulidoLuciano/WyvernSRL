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
import { areaTableHeaders, employeeTableHeaders } from "../utils/dataArrays"
import { useEmployees } from '../hooks/useEmployees';
import { useGeneral } from '../hooks/useGeneral';
import { useAreas } from '../hooks/useAreas';
import * as Yup from "yup"
import { employeeType, CreateEmployeesErrors, employeeFilterType } from '../utils/types/employeeType';
import { employeeSchema } from '../schemas/employeeSchema';
import { areaSchema } from '../schemas/areaSchema';
import { areaType } from '../utils/types/areaType';

const EmployeesModule = () => {

  const { getAllEmployees, employees, createEmployee, deleteEmployee, error } = useEmployees();
  const { states, countries, positions, getAllPositions, getAllStates, getAllCountries } = useGeneral();
  const { getAllAreas, areas, createArea, deleteArea} = useAreas();

  useEffect(() => {
    getAllEmployees(true);
    getAllStates();
    getAllCountries();
    getAllPositions()
    getAllAreas();
  }, [])
  
  const [createFormStates,setCreateFormStates] = useState<Array<any>>([]);
  const [filterFormStates,setFilterFormStates] = useState<Array<any>>([]);
  const [dataLength, setDataLength] = useState<number>(10);
  const [selectedEmployees, setSelectedEmployees] = useState<Array<string>>([])
  const [selectedAreas, setSelectedAreas] = useState<Array<string>>([])
  const [currentPageEmployee, setCurrentPageEmployee] = useState<number>(1);
  const [currentPageArea, setCurrentPageArea] = useState<number>(1);
  const [createErrors, setCreateErrors] = useState<CreateEmployeesErrors>({});
  const [createEmployeeData, setCreateEmployeeData] = useState<employeeType>({
    name: '',
    phone: '',
    email: '',
    dni: null,
    hiringDate: null,
    salary: null,
    country: '',
    state: '',
    position: ''
  });

  const [filterEmployeeData, setFilterEmployeeData] = useState<employeeFilterType>({
    name: '',
    dni: '',
    salary: '',
    country: '',
    state: '',
  });
  
  const [createAreaData, setCreateAreaData] = useState<areaType>({
    name: '',
  });

  const indexEndEmployee = currentPageEmployee * dataLength;
  const indexStartEmployee = indexEndEmployee - dataLength;
  const nPagesEmployee = Math.ceil(employees.length / dataLength);
  const dataEmployeeShown = employees.slice(indexStartEmployee, indexEndEmployee);

  const indexEndArea = currentPageArea * dataLength;
  const indexStartArea = indexEndArea - dataLength;
  const nPagesArea = Math.ceil(areas.length / dataLength);
  const dataAreaShown = areas.slice(indexStartArea, indexEndArea);

  const changePageEmployee = (nextPage: number) => {
    setCurrentPageEmployee(nextPage);
  }

  const changePageArea = (nextPage: number) => {
    setCurrentPageArea(nextPage);
  }

  const handleCreateEmployeeSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const state = states.find(s => s.id == createEmployeeData.state);
      await employeeSchema.validate(createEmployeeData, { abortEarly: false });
      createEmployee(createEmployeeData)
      setCreateErrors({})
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

  const handleFilterEmployeeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nombre: filterEmployeeData.name,
      dni: filterEmployeeData.dni,
      sueldo: filterEmployeeData.salary,
      Provincias_id: filterEmployeeData.state,
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

    getAllEmployees(true,filter.join(""));
  }

  const handleCreateEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setCreateFormStates(statesAvailables)
    }
    setCreateEmployeeData({
      ...createEmployeeData,
      [name]: value
    });
  }

  const handleFilterEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setFilterFormStates(statesAvailables)
    }
    setFilterEmployeeData({
      ...filterEmployeeData,
      [name]: value
    });
  }

  const handleSelectedEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData
    const dataExist = selectedEmployees.find(d => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedEmployees.filter(d => d != dataExist);
      setSelectedEmployees(newSelectedData)
    }
    else {
      setSelectedEmployees([...selectedEmployees, e.target.id]);
    }

  }

  const handleDeleteSelectedEmployees = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      const dataDelete = await deleteEmployee(selectedData);
      if (dataDelete) console.log("clientes eliminados exitosamente");
      setSelectedEmployees([])
    }
  }

  const handleCreateAreaSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await areaSchema.validate(createAreaData, { abortEarly: false });
      createArea(createAreaData)
      setCreateErrors({});
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

  const handleCreateAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCreateAreaData({
      ...createEmployeeData,
      [name]: value
    });
  }

  const handleSelectedAreas = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData
    const dataExist = selectedAreas.find(d => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedAreas.filter(d => d != dataExist);
      setSelectedAreas(newSelectedData)
    }
    else {
      setSelectedAreas([...selectedAreas, e.target.id]);
    }

  }

  const handleDeleteSelectedAreas = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      const dataDelete = await deleteArea(selectedData);
      if (dataDelete) console.log("clientes eliminados exitosamente");
      setSelectedEmployees([])
    }
  }
  
  return (
    <main className='w-full flex '>
      <Nav />
      <div className='m-0 laptop:ms-72 p-8 w-full'>
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Empleados</h1>
          <p>Ver, crear, editar y eliminar Empleados</p>
        </div>
        {error && <div className='flex gap-3 justify-center mt-0'>
              <svg className="w-6 h-6 text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className='text-red text-lg'>{error}</p>
        </div>}

        <Accordion title="Crear Nuevo Empleado">
          <Form handleSubmit={handleCreateEmployeeSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-4 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"nombre"} name={"name"} value={createEmployeeData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleCreateEmployeeChange} error={createErrors.name}></Input>
              <Input id={"correo"} name={"email"} value={createEmployeeData.email} title={"Email"} type={"text"} placeholder={"username@gmail.com"} onChange={handleCreateEmployeeChange} error={createErrors.email}></Input>
              <Input id={"dni"} name={"dni"} value={createEmployeeData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleCreateEmployeeChange} error={createErrors.dni}></Input>
              <Input id={"telefono"} name={"phone"} value={createEmployeeData.phone} title={"Telefono"} type={"text"} placeholder={"+3814848949"} onChange={handleCreateEmployeeChange} error={createErrors.phone}></Input>
              <Input id={"fechaContratacion"} name={"hiringDate"} value={createEmployeeData.hiringDate} title={"Fecha de contratacion"} type={"text"} placeholder={"2024-09-30 14:30:14"} onChange={handleCreateEmployeeChange} error={createErrors.hiringDate}></Input>
              <Input id={"salario"} name={"salary"} value={createEmployeeData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleCreateEmployeeChange} error={createErrors.salary}></Input>
              <Select id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleCreateEmployeeChange} error={createErrors.country}></Select>
              <Select id={"provincia"} title={"Provincia"} name={"state"} options={createFormStates} onChange={handleCreateEmployeeChange} error={createErrors.state}></Select>
              <Select id={"puesto"} title={"Puesto"} name={"position"} options={positions} onChange={handleCreateEmployeeChange} error={createErrors.position}></Select>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterEmployeeSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreFiltrar"} name={"name"} value={filterEmployeeData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleFilterEmployeeChange} error=''></Input>
              <Input id={"dniFiltrar"} name={"dni"} value={filterEmployeeData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleFilterEmployeeChange} error=''></Input>
              <Input id={"salarioFiltrar"} name={"salary"} value={filterEmployeeData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleFilterEmployeeChange} error=''></Input>
              <Select id={"paisesFiltrar"} title={"País"} name={"country"} options={countries} onChange={handleFilterEmployeeChange}></Select>
              <Select id={"provinciaFiltrar"} title={"Provincia"} name={"state"} options={filterFormStates} onChange={handleFilterEmployeeChange}></Select>
              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Empleados</h2>
            <p>Página {currentPageEmployee} de {nPagesEmployee}</p>
          </div>

          <button onClick={() => handleDeleteSelectedEmployees(selectedEmployees)} className='bg-red font-semibold text-sm rounded flex items-center justify-center px-2 tablet:col-start-3 tablet:gap-1 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedEmployees.length})
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
              dataEmployeeShown.length != 0?
              dataEmployeeShown.map((empleado, index) => {
                return (
                  <TRow key={index} id={empleado.id} detail={true} handleDelete={()=>deleteEmployee([empleado.id.toString()])} deleteButton={true} path='employees'>
                    <TData id={empleado.id} onChange={handleSelectedEmployees} checkbox={true}>{empleado.nombre}</TData>
                    <TData>{empleado.correo ? empleado.correo : "-"}</TData>
                    <TData>{empleado.dni ? empleado.dni : "-"}</TData>
                    <TData>{empleado.sueldo ? `$${empleado.sueldo}` : "-"}</TData>
                    <TData>{empleado.Provincias?.nombre }</TData>
                  </TRow>)
              }):
              <div className=''>No hay empleados con esas caracteristicas </div>
            }
          </Table>
        </div>
        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageEmployee} nPages={nPagesEmployee} currentPage={currentPageEmployee} indexStart={indexStartEmployee} indexEnd={indexEndEmployee} />
        </div>

        <Accordion title="Crear Nueva area">
          <Form handleSubmit={handleCreateAreaSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-10">
            <>
              <Input id={"name"} name={"name"} value={createAreaData.name} title={"Nombre"} type={"text"} placeholder={"Ventas"} onChange={handleCreateAreaChange} error={createErrors.name}></Input>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-end-2 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Areas</h2>
            <p>Página {currentPageArea} de {nPagesArea}</p>
          </div>

          <button onClick={() => handleDeleteSelectedAreas(selectedAreas)} className='bg-red font-semibold text-sm rounded flex items-center justify-center px-2 tablet:col-start-3 tablet:gap-1 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedAreas.length})
          </button>

        </div>

        <div className='overflow-x-auto mt-6'>
          <Table headers={areaTableHeaders}>
            {
              dataAreaShown.length !=0 ?
              dataAreaShown.map((area, index) => {
                return (
                  <TRow key={index} id={area.id} detail={true} handleDelete={()=>deleteArea([area.id.toString()])} deleteButton={true} path='area'>
                    <TData id={area.id} onChange={handleSelectedAreas} checkbox={true}>{area.id}</TData>
                    <TData>{area.nombre}</TData>
                  </TRow>)
              }):
              <div className=''>No hay areas </div>
            }

          </Table>

          <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
            <Pagination changePage={changePageArea} nPages={nPagesArea} currentPage={currentPageArea} indexStart={indexStartArea} indexEnd={indexEndArea} />
          </div>

        </div>
      </div>

    </main>
  )
}

export default EmployeesModule