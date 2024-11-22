import React, { useState, useEffect } from 'react'
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
import { useUsers } from '../hooks/useUsers';
import { rolesTableHeaders, usersTableHeaders } from '../utils/dataArrays';
import * as Yup from "yup"
import { CreateUserErrors, FilterUserErrors, userFilterType, userType } from '../utils/types/userTypes';
import { userSchema } from '../schemas/userSchema';
import { useEmployees } from '../hooks/useEmployees';

const AdminModule = () => {

    const { getAllUsers , users, getAllRoles, roles, createUser} = useUsers()
    const { getAllEmployees, employees }= useEmployees();

    useEffect(() => {
        getAllUsers(true,true);
        getAllRoles();
        getAllEmployees();
      }, [])

    const [createErrors, setCreateErrors] = useState<CreateUserErrors>({})
    const [filterErrors, setFilterErrors] = useState<FilterUserErrors>({})
    const [dataLength, setDataLength] = useState<number>(10);
    const [currentPageUser, setCurrentPageUser] = useState<number>(1)
    const [currentPageRole, setCurrentPageRole] = useState<number>(1)

    const [user, setUser] = useState<userType>({
        name: '',
        password: '',
        employeeDNI: '',
        role: ''
      });

      const [filterUser, setFilterUser] = useState<userFilterType>({
        name: '',
        dni: '',
        role: ''
      });

      console.log(user);
      
      const indexEndUser = currentPageUser * dataLength;
      const indexStartUser = indexEndUser - dataLength;
      const nPagesUser = Math.ceil(users.length / dataLength);
      const dataShownUser = users.slice(indexStartUser, indexEndUser);

      const indexEndRole = currentPageRole * dataLength;
      const indexStartRole = indexEndRole - dataLength;
      const nPagesRole = Math.ceil(roles.length / dataLength);
      const dataShownRole = roles.slice(indexStartRole, indexEndRole);

      const changePageUser = (nextPage: number) => {
        setCurrentPageUser(nextPage);
      }

      const changePageRole = (nextPage: number) => {
        setCurrentPageRole(nextPage);
      }
    
    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {

         const employeeExist = employees.find(e => e.dni == user.employeeDNI);

         if (employeeExist == undefined) {
            setCreateErrors({ ...createErrors, employee: "Este empleado no existe" })
            throw new Error("Este empleado no existe")
          }

          await userSchema.validate(user, { abortEarly: false });
          console.log(user);

          const data: userType = {
            name: user.name,
            password: user.password,
            employeeDNI: employeeExist.id,
            role: user.role
          }
          
          createUser(data)
         setCreateErrors({});
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
    
            const createErrors: CreateUserErrors = {};
            err.inner.forEach((error) => {
              if (error.path) createErrors[error.path as keyof CreateUserErrors] = error.message;
            });
    
            setCreateErrors(createErrors);
            console.log(createErrors);
    
          }
        }
      }
    
      
      const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
   
                setUser({
                    ...user,
                    [name]: value
                });
           
      }

      const handleFilterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const employeeExist = employees.find(e => e.nombre == filterUser.dni);

        // if (employeeExist == undefined) {
        //    setCreateErrors({ ...createErrors, employee: "Este cliente no existe" })
        //    throw new Error("Este cliente no existe")
        //  }

        const data = {
          nombre: filterUser.name,
          Empleados_id: filterUser.dni,
          Roles_id: filterUser.role
        }
        const datos = Object.entries(data);
        if (datos.length == 2) return;
    
        const filter: Array<string> = []
        datos.forEach((d, index) => {
          console.log(d);
          
          if (d[1] != "" && index == 0) {
            if (d[0] == "Roles_id" || d[0] == "Empleados_id") {
              filter.push(`?${d[0]}=${d[1]}`);
            } else {
              filter.push(`?${d[0]}[contains]=${d[1]}`)
            }
          } else if (d[1] != "") {
            if (d[0] == "Roles_id" || d[0] == "Empleados_id") {
              filter.push(`&${d[0]}=${d[1]}`);
            } else {
              filter.push(`&${d[0]}[contains]=${d[1]}`);
            }
    
          }
        })
    
        getAllUsers(true, true, filter.join(""));
    
      }

      const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
          setFilterUser({
            ...filterUser,
            [name]: value
          });
        
      }

  return (
    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative'>
     
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Admin</h1>
          <p>Ver, crear, editar y eliminar Usuarios</p>
        </div>

        <Accordion title="Crear Nuevo">
          <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"name"} name={"name"} value={user.name} title={"Nombre de usuario"} type={"text"} placeholder={"username"} onChange={handleCreateChange} error={createErrors.name}></Input>
              <Input id={"password"} name={"password"} value={user.password} title={"Contraseña"} type={"password"} placeholder={""} onChange={handleCreateChange} error={createErrors.password}></Input>
              <Input id={"employeeDNI"} name={"employeeDNI"} value={user.employeeDNI} title={"DNI del empleado"} type={"number"} placeholder={"44478902"} onChange={handleCreateChange} error={createErrors.employee}></Input>
              <Select error={createErrors.role} id={"role"} title={"Rol"} name={"role"} options={roles} onChange={handleCreateChange}></Select>
              
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreProveedorFiltrar"} name={"name"} value={filterUser.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange} ></Input>
              {/* <Input id={"dni"} name={"dni"} value={filterUser.dni} title={"DNI"} type={"text"} placeholder={"444448787"} onChange={handleFilterChange} error={filterErrors.dni}></Input>        */}
              <Select id={"provinciasFiltrar"} name={"role"} title={"Rol"} options={roles} onChange={handleFilterChange}></Select>

              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>

        
        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Usuarios</h2>
            <p>Página {currentPageUser} de {nPagesUser}</p>
          </div>

        </div>
        <div className='overflow-x-auto mt-6'>
          <Table headers={usersTableHeaders}>
            {dataShownUser.length != 0 ?
              dataShownUser.map((u, index) => {
                return (
                  <TRow key={index} id={u.id} detail={true} deleteButton={false} path='admin'>
                    <TData>{u.nombre}</TData>
                    <TData>{u.Empleados?.dni}</TData>
                    <TData>{u.Roles?.nombre}</TData>
                  </TRow>)
              })
              : <div className=''>No hay clientes con esas caracteristicas</div>

            }
          </Table>
        </div>

        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageUser} nPages={nPagesUser} currentPage={currentPageUser} indexStart={indexStartUser} indexEnd={indexEndUser} />
        </div>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Roles</h2>
            <p>Página {currentPageRole} de {nPagesRole}</p>
          </div>

        </div>
        <div className='overflow-x-auto mt-6 '>
          <Table headers={rolesTableHeaders}>
            {dataShownRole.length != 0 ?
              dataShownRole.map((r, index) => {
                return (
                  <TRow key={index} id={r.id} detail={true} deleteButton={false} path='roles'>
                    <TData>{r.id}</TData>
                    <TData>{r.nombre}</TData>
                  </TRow>)
              })
              : <div className=''>No hay roles con esas caracteristicas</div>

            }
          </Table>
        </div>

        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageRole} nPages={nPagesRole} currentPage={currentPageRole} indexStart={indexStartRole} indexEnd={indexEndRole} />
        </div>

      
    </main>
  )
}

export default AdminModule