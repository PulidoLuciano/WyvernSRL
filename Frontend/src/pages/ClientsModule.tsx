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
import { useClients } from '../hooks/useClients';
import { useGeneral } from '../hooks/useGeneral';
import { clientType, CreateClientErrors } from '../utils/types/clientType';
import { clientSchema } from '../schemas/clientsSchema';
import * as Yup from 'yup'

const ClientsModule = () => {

  const { loading, error, clients, getAllClients, createClient, deleteClient } = useClients();
  const { countries, platforms, getAllCountries, getAllPlatforms } = useGeneral();

  useEffect(() => {
    getAllClients(true, true);
  }, [getAllClients])

  useEffect(() => {
    getAllCountries();
    getAllPlatforms();
  }, [getAllCountries, getAllPlatforms])

  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createErrors, setCreateErrors] = useState<CreateClientErrors>({})
  const [createData, setCreateData] = useState<clientType>({
    name: '',
    phone: '',
    email: '',
    platform: '',
    suscription: 'false',
    country: ''
  });

  const [selectedData, setSelectedData] = useState<Array<string>>([])

  const [filterData, setFilterData] = useState<clientType>({
    name: '',
    phone: '',
    email: '',
    platform: '',
    suscription: 'false',
    country: '',
    deleted: 'false',
  });

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(clients.length / dataLength);
  const dataShown = clients.slice(indexStart, indexEnd);


  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

  const handleSelectedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData
    const dataExist = selectedData.find(d => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedData.filter(d => d != dataExist);
      setSelectedData(newSelectedData)
    }
    else {
      setSelectedData([...selectedData, e.target.id]);
    }

  }

  const handleDeleteSelectedData = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      const dataDelete = await deleteClient(selectedData);
      if (dataDelete) console.log("clientes eliminados exitosamente");
      setSelectedData([])
    }

  }

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll)
  }

  //********
  const clientTableHeaders: Array<string> = [
    "Nombre"
    ,
    "Plataforma"
    ,
    "País"
    ,
    "Suscripto"
    ,
    "Correo"

  ]

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children
    if (createData.suscription == "" && createData.country == "" && createData.platform == "") {

    }

    console.log(createData);
    try {

      await clientSchema.validate(createData, { abortEarly: false });
      createClient(createData)
      setCreateErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const createErrors: CreateClientErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createErrors[error.path as keyof CreateClientErrors] = error.message;
        });

        setCreateErrors(createErrors);
        console.log(createErrors);

      }
    }
  }

  const handleFilterSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filterData? true : false);
    const data = {
      nombre: filterData.name,
      correo: filterData.email,
      telefono:filterData.phone,
      Plataforma_id: filterData.platform,
      Paises_id: filterData.country,
      borrado: filterData.deleted,
      suscripto: filterData.suscription
    }
    const datos = Object.entries(data);
    if(datos.length == 2) return;
    
    const filter : Array<string> = []
    datos.forEach((d,index) => {
      if(d[1] != "" && index==0){
        (d[0] == "borrado" || d[0] == "suscripto") ? filter.push(`?${d[0]}=${d[1]}`) : 
        filter.push( `?${d[0]}[contains]=${d[1]}`);
      }
      else if(d[1] != ""){
        (d[0] == "borrado" || d[0] == "suscripto") ? filter.push(`&${d[0]}=${d[1]}`) : 
        filter.push( `&${d[0]}[contains]=${d[1]}`);
      }
    })
      
   getAllClients(true,true,filter.join(""));
   
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(e.target.ariaPressed);

    if (createData.suscription == "false" && e.target.type == "checkbox") {
      setCreateData({
        ...createData,
        suscription: "true"
      })
    }
    else if (createData.suscription == "true" && e.target.type == "checkbox") {
      setCreateData({
        ...createData,
        suscription: "false"
      })

    } else {
      setCreateData({
        ...createData,
        [name]: value
      });
    }

  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (filterData.suscription == "false" && e.target.type == "checkbox") {
      setFilterData({
        ...filterData,
        suscription: "true"
      })
    }
    else if (filterData.suscription == "true" && e.target.type == "checkbox") {
      setFilterData({
        ...filterData,
        suscription: "false"
      })
    } else {
      setFilterData({
        ...filterData,
        [name]: value
      });
    }
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
                <Input error={createErrors.name} id={"nombreCliente"} name={"name"} value={createData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleCreateChange}></Input>
                <Input error={createErrors.email} id={"correo"} name={"email"} value={createData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleCreateChange}></Input>
                <Input error={createErrors.phone} id={"telefono"} name={"phone"} value={createData.phone} title={"Teléfono"} type={"text"} placeholder={"5493816341612"} onChange={handleCreateChange}></Input>
                <Select error={createErrors.platform} id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleCreateChange}></Select>
                <Checkbox title={"Suscripto"} name={"suscription"} onChange={handleCreateChange}></Checkbox>
                <Select error={createErrors.country} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleCreateChange}></Select>
                <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
              </>
            </Form>
          </Accordion>
          <Accordion title="Filtrar por">
            <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-4 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
              <>
                <Input id={"nombreCliente"} name={"name"} value={filterData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange} ></Input>
                <Input id={"correo"} name={"email"} value={filterData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleFilterChange} ></Input>
                <Input id={"telefono"} name={"phone"} value={filterData.phone} title={"Teléfono"} type={"text"} placeholder={"5493816341612"} onChange={handleFilterChange}></Input>
                <Select id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleFilterChange}></Select>
                <Checkbox title={"Suscripto"} name={"suscription"} onChange={handleFilterChange}></Checkbox>
                <Select id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleFilterChange}></Select>
                <Select id={"borrado"} title={"Borrado"} name={"deleted"} options={[{ id: "true", nombre: "Si" }, { id: "false", nombre: "No" }]} onChange={handleFilterChange}></Select>
                <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
              </>
            </Form>
          </Accordion>

          <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
            <div className='flex gap-2 items-end tablet:col-span-2'>
              <h2>Clientes</h2>
              <p>Página 1 de 20</p>
            </div>

            <button onClick={() => handleDeleteSelectedData(selectedData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
              Eliminar Seleccionados ({selectedData.length})
            </button>

            <button className='bg-primary font-semibold laptopL:col-start-6 laptopL:col-end-7 rounded flex gap-2 items-center justify-center text-white'>
              <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>
              Enviar Noticia
            </button>
          </div>

          <div className='overflow-x-auto mt-6'>
            {loading && <p>Cargando clientes...</p>}
            {error ? <p>Error: {error}</p> :
              <Table id='ClientsTable' headers={clientTableHeaders}>
                { dataShown.length!=0?
                  dataShown.map((cliente, index) => (
                    <TRow id={cliente.id} key={index}>
                      <TData selectedAll={selectedAll} id={cliente.id} checkbox={true} onChange={handleSelectedItem} >{cliente.nombre}</TData>
                      <TData>{cliente.Plataformas?.nombre}</TData>
                      <TData>{cliente.Paises?.nombre}</TData>
                      <TData>{cliente.suscripto ? "Si" : "No"}</TData>
                      <TData>{cliente.correo}</TData>
                    </TRow>
                  )) :
                  <div className=''>No hay clientes con esas caracteristicas</div>
                }
              </Table>
            }
          </div>


          <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

            <Pagination changePage={changePage} nPages={nPages} currentPage={currentPage} indexStart={indexStart} indexEnd={indexEnd} />

          </div>
        </div>


      </main>
    )
  }

  export default ClientsModule