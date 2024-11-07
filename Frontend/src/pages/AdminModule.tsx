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
import { usersTableHeaders } from '../utils/dataArrays';
import * as Yup from "yup"
import { CreateUserErrors, userType } from '../utils/types/userTypes';
import { userSchema } from '../schemas/userSchema';
import { useEmployees } from '../hooks/useEmployees';

const AdminModule = () => {

    const { getAllUsers , users, getAllRoles, roles, createUser} = useUsers()
    const { getAllEmployees, employees }= useEmployees();

    useEffect(() => {
        getAllUsers();
        getAllRoles();
        getAllEmployees();
      }, [])

    const [createErrors, setCreateErrors] = useState<CreateUserErrors>({})
    const [dataLength, setDataLength] = useState<number>(10);
    const [currentPageUser, setCurrentPageUser] = useState<number>(1)


    const [user, setUser] = useState<userType>({
        name: '',
        password: '',
        employee: '',
        role: ''
      });

      const indexEndUser = currentPageUser * dataLength;
      const indexStartUser = indexEndUser - dataLength;
      const nPagesUser = Math.ceil(users.length / dataLength);
      const dataShownUser = users.slice(indexStartUser, indexEndUser);

    const changePageUser = (nextPage: number) => {
        setCurrentPageUser(nextPage);
      }
    
    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    

        try {

         const employeeExist = employees.find(e => e.nombre == user.employee);

         if (employeeExist == undefined) {
            setCreateErrors({ ...createErrors, employee: "Este cliente no existe" })
            throw new Error("Este cliente no existe")
          }

          await userSchema.validate(user, { abortEarly: false });
          console.log(user);

          const data: userType = {
            name: user.name,
            password: user.password,
            employee: employeeExist.id,
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

    //   const handleSelectedUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let newSelectedData
    //     const dataExist = selectedUser.find(d => d == e.target.id);
    
    //     if (dataExist) {
    //       newSelectedData = selectedUser.filter(d => d != dataExist);
    //       setSelectedUser(newSelectedData)
    //     }
    //     else {
    //       setSelectedUser([...selectedUser, e.target.id]);
    //     }
    //   }
    
    //   const handleDeleteSelectedUsers = async (selectedData: Array<string>) => {
    
    //     if (!selectedData || selectedData.length == 0) {
    //       return
    //     } else {
          
    //       const dataDelete = await deleteUser(selectedData);
    //       if (dataDelete) console.log("proveedores eliminados exitosamente");
          
    //       setSelectedMarketData([])
    //     }
    
    //   }

  return (
    <main className='w-full flex '>
      <Nav />
      <div className='ms-72 p-8'>
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Admin</h1>
          <p>Ver, crear, editar y eliminar Usuarios</p>
        </div>

        <Accordion title="Crear Nuevo">
          <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"name"} name={"name"} value={user.name} title={"Nombre de usuario"} type={"text"} placeholder={"username"} onChange={handleCreateChange} error={createErrors.name}></Input>
              <Input id={"password"} name={"password"} value={user.password} title={"Contraseña"} type={"password"} placeholder={""} onChange={handleCreateChange} error={createErrors.password}></Input>
              <Input id={"employee"} name={"employee"} value={user.employee} title={"Empleado"} type={"text"} placeholder={"Juan Cruz"} onChange={handleCreateChange} error={createErrors.employee}></Input>
              <Select error={createErrors.role} id={"role"} title={"Rol"} name={"role"} options={roles} onChange={handleCreateChange}></Select>
              
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        {/* <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreProveedorFiltrar"} name={"name"} value={filterSupplier.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange} ></Input>
              <Select id={"paisesFiltrar"} title={"País"} name={"country"} options={countries} onChange={handleFilterChange}></Select>
              <Select id={"provinciasFiltrar"} name={"state"} title={"Provincia"} options={filterFormStates} onChange={handleFilterChange}></Select>
              <Select id={"rubrosFiltrar"} name={"category"} title={"Rubro"} options={categories} onChange={handleFilterChange}></Select>

              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion> */}

        
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
                  <TRow key={index} id={u.id} detail={true} deleteButton={true} path='admin'>
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

      </div>
    </main>
  )
}

export default AdminModule