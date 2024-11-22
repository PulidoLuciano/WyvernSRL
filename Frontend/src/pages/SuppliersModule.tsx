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
import { useGeneral } from '../hooks/useGeneral';
import useSuppliers from '../hooks/useSuppliers';
import { marketSchema, supplierSchema } from '../schemas/suppliersSchema';
import { CreateMarketsErrors, CreateSupplierErrors, marketType, suppliersFilter, suppliersType } from '../utils/types/suppliersType';
import { suppliersTableHeaders, marketsTableHeaders } from '../utils/dataArrays';
import * as Yup from "yup"
import { useMarkets } from '../hooks/useMarkets';
import { useAuth } from '../context/authContext';
import Swal from 'sweetalert2';

const SuppliersModule = () => {
  const { states, categories, countries, getAllStates, getAllCountries } = useGeneral();
  const { suppliers, loading, error, getAllSuppliers, getSupplier, createSupplier, deleteSuppliers } = useSuppliers();
  const { getMarkets, markets, createMarket, deleteMarkets } = useMarkets();
  const { role } = useAuth()

  useEffect(() => {
    getAllCountries();
    getAllSuppliers(true, true);
    getAllStates();
    getMarkets();
  }, [])
  
  const [createFormStates,setCreateFormStates] = useState<Array<any>>([])
  const [filterFormStates,setFilterFormStates] = useState<Array<any>>([])
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPageSupplier, setCurrentPageSupplier] = useState<number>(1)
  const [currentPageMarket, setCurrentPageMarket] = useState<number>(1)
  const [createErrors, setCreateErrors] = useState<CreateSupplierErrors>({})
  const [createMarketErrors, setCreateMarketErrors] = useState<CreateMarketsErrors>({})
  const [selectedSupplierData, setSelectedSupplierData] = useState<Array<string>>([])
  const [selectedMarketData, setSelectedMarketData] = useState<Array<string>>([])
  const [supplier, setSupplier] = useState<suppliersType>({
    name: '',
    state: '',
    email: '',
    phone: '',
    category: '',
    country: '',
  });

  const [filterSupplier, setFilterSupplier] = useState<suppliersFilter>({
    name: '',
    state: '',
    category: '',
    country:''
});

  const [market, setMarket] = useState<marketType>({
    name: ''
  });
  

  const indexEndSupplier = currentPageSupplier * dataLength;
  const indexStartSupplier = indexEndSupplier - dataLength;
  const nPagesSupplier = Math.ceil(suppliers.length / dataLength);
  const dataShownSupplier = suppliers.slice(indexStartSupplier, indexEndSupplier);

  const indexEndMarket = currentPageMarket * dataLength;
  const indexStartMarket = indexEndMarket - dataLength;
  const nPagesMarket = Math.ceil(markets.length / dataLength);
  const dataShownMarket = markets.slice(indexStartMarket, indexEndMarket);

  const changePageSupplier = (nextPage: number) => {
    setCurrentPageSupplier(nextPage);
  }

  const changePageMarket = (nextPage: number) => {
    setCurrentPageMarket(nextPage);
  }

  const handleSelectedSupplier = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    let isSelected = e.target.checked;
    let value = e.target.value
    
   
    if(isSelected){
      setSelectedSupplierData([...selectedSupplierData,value])
    }else{
      newSelectedData = selectedSupplierData.filter(d => d != value);
      setSelectedSupplierData(newSelectedData)
    }

  }

  const handleDeleteSelectedSupplier = async (selectedData: Array<string>) => {

    if (role == 'Auditor') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tiene autorizacion para esta accion",
      });
      return
    }
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      const dataDelete = await deleteSuppliers(selectedData);
      if (dataDelete) console.log("proveedores eliminados exitosamente");
      setSelectedSupplierData([])
    }

  }

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (role == 'Auditor') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tiene autorizacion para esta accion",
      });
      return
    }
    
    try {

      const state = states.find(s => s.id == supplier.state);
      await supplierSchema.validate(supplier, { abortEarly: false });
      createSupplier(supplier)
      setCreateErrors({});

      setSupplier({
        name: '',
        state: '',
        email: '',
        phone: '',
        category: '',
        country: '',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const createErrors: CreateSupplierErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createErrors[error.path as keyof CreateSupplierErrors] = error.message;
        });

        setCreateErrors(createErrors);
        console.log(createErrors);

      }
    }
  }

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nombre: filterSupplier.name,
      Provincias_id: filterSupplier.state,
      Rubros_id: filterSupplier.category,
    }
    const datos = Object.entries(data);
    if (datos.length == 2) return;

    const filter: Array<string> = []
    datos.forEach((d, index) => {
      if (d[1] != "" && index == 0) {
        if (d[0] == "Provincias_id" || d[0] == "Rubros_id") {
          filter.push(`?${d[0]}=${d[1]}`);
        } else {
          filter.push(`?${d[0]}[contains]=${d[1]}`)
        }
      } else if (d[1] != "") {
        if (d[0] == "Provincias_id" || d[0] == "Rubros_id") {
          filter.push(`&${d[0]}=${d[1]}`);
        } else {
          filter.push(`&${d[0]}[contains]=${d[1]}`);
        }

      }
    })

    getAllSuppliers(true, true, filter.join(""));
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setCreateFormStates(statesAvailables)
    }
    setSupplier({
      ...supplier,
      [name]: value
    });
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setFilterFormStates(statesAvailables)
    }
      setFilterSupplier({
        ...filterSupplier,
        [name]: value
      });
  }

  const handleSelectedMarket = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    let isSelected = e.target.checked;
    let value = e.target.value
    
   
    if(isSelected){
      setSelectedMarketData([...selectedMarketData,value])
    }else{
      newSelectedData = selectedMarketData.filter(d => d != value);
      setSelectedMarketData(newSelectedData)
    }
  }

  const handleDeleteSelectedMarket = async (selectedData: Array<string>) => {
    if (role == 'Auditor') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tiene autorizacion para esta accion",
      });
      return
    }
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      
      const dataDelete = await deleteMarkets(selectedData);
      if (dataDelete) console.log("proveedores eliminados exitosamente");
      
      setSelectedMarketData([])
    }

  }
  
  const handleMarketSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (role == 'Auditor') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tiene autorizacion para esta accion",
      });
      return
    }

    try {
      await marketSchema.validate(market, { abortEarly: false });
      createMarket(market)
      setMarket({
        name: ""
      })
      setCreateErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const createErrors: CreateMarketsErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createErrors[error.path as keyof CreateMarketsErrors] = error.message;
        });

        setCreateMarketErrors(createErrors);
      }
    }
  }

  const handleMarketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMarket({
      ...market,
      [name]: value
    });
  }

  return (
    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative'>
      
     
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Proveedores</h1>
          <p>Ver, crear, editar y eliminar Proveedores</p>
        </div>

        <Accordion title="Crear Nuevo">
          <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"nombreProveedor"} name={"name"} value={supplier.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleCreateChange} error={createErrors.name}></Input>
              <Input id={"correoProveedor"} name={"email"} value={supplier.email} title={"Correo"} type={"text"} placeholder={"username@wyvern.com"} onChange={handleCreateChange} error={createErrors.email}></Input>
              <Input id={"telefonoProveedor"} name={"phone"} value={supplier.phone} title={"Teléfono"} type={"text"} placeholder={"543816341612"} onChange={handleCreateChange} error={createErrors.phone}></Input>
              <Select selected={supplier.country} error={createErrors.country} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleCreateChange}></Select>
              <Select selected={supplier.state} error={createErrors.state} id={"provincias"} name={"state"} title={"Provincia"} options={createFormStates} onChange={handleCreateChange}></Select>
              <Select selected={supplier.category} error={createErrors.category} id={"rubros"} name={"category"} title={"Rubro"} options={markets} onChange={handleCreateChange}></Select>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreProveedorFiltrar"} name={"name"} value={filterSupplier.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleFilterChange} ></Input>
              <Select id={"paisesFiltrar"} title={"País"} name={"country"} options={countries} onChange={handleFilterChange}></Select>
              <Select id={"provinciasFiltrar"} name={"state"} title={"Provincia"} options={filterFormStates} onChange={handleFilterChange}></Select>
              <Select id={"rubrosFiltrar"} name={"category"} title={"Rubro"} options={markets} onChange={handleFilterChange}></Select>

              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Proveedores</h2>
            <p>Página {currentPageSupplier} de {nPagesSupplier}</p>
          </div>

          <button onClick={() => handleDeleteSelectedSupplier(selectedSupplierData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center px-2 tablet:col-start-3 tablet:gap-2 laptopL:col-start-6 laptopL:col-end-6'>
            <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedSupplierData.length})
          </button>
        </div>

        <div className='overflow-x-auto mt-6'>
          <Table headers={suppliersTableHeaders}>
            {
            dataShownSupplier.length != 0 ?
              dataShownSupplier.map((s, index) => {
                return (
                  <TRow key={index} id={s.id} detail={true} deleteButton={true} handleDelete={role=='Auditor' ? 
                    ()=>Swal.fire({ icon: "error",  title: "Oops...", text: "No tiene autorizacion para esta accion", })
                    :()=>deleteSuppliers([s.id.toString()])} path='suppliers'>
                    <TData id={s.id} onChange={handleSelectedSupplier} selectedData={selectedSupplierData} value={s.id} checkbox={true}>{s.nombre}</TData>
                    <TData>{s.correo ? s.correo : "-"}</TData>
                    <TData>{s.telefono ? s.telefono : "-"}</TData>
                    <TData>{s.Provincias?.nombre}</TData>
                    <TData>{s.Rubros?.nombre}</TData>
                  </TRow>)
              }):
              <div>No hay proveedores con esas caracteristicas</div>
            }
          </Table>
        </div>

        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageSupplier} nPages={nPagesSupplier} currentPage={currentPageSupplier} indexStart={indexStartSupplier} indexEnd={indexEndSupplier} />
        </div>


        <Accordion title="Crear Nuevo Rubro">
          <Form handleSubmit={handleMarketSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input id={"nombreRubro"} name={"name"} value={market.name} title={"Nombre"} type={"text"} placeholder={"Hardware"} onChange={handleMarketChange} error={createErrors.name}></Input>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-end-2 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Rubros</h2>
            <p>Página {currentPageMarket} de {nPagesMarket}</p>
          </div>

          <button onClick={() => handleDeleteSelectedMarket(selectedMarketData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center px-2 tablet:col-start-3 tablet:gap-1 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedMarketData.length})
          </button>

        </div>

        <div className='overflow-x-auto mt-6'>
          <Table headers={marketsTableHeaders}>
            {suppliers?
              dataShownMarket.map((r, index) => {
                return (
                  <TRow key={index} id={r.id} detail={true} deleteButton={true} handleDelete={role=="Auditor" ? ()=>Swal.fire({icon: "error", title: "Oops...", text: "No tiene autorizacion para esta accion",})
                  :()=>deleteMarkets([r.id.toString()])} path='markets'>
                    <TData id={r.id} onChange={handleSelectedMarket} selectedData={selectedMarketData} value={r.id} checkbox={true}>{r.id}</TData>
                    <TData>{r.nombre}</TData>
                  </TRow>)
              }) : <div>No hay proveedores con esas caracteristicas</div>
            }

          </Table>
        </div>

        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageMarket} nPages={nPagesMarket} currentPage={currentPageMarket} indexStart={indexStartMarket} indexEnd={indexEndMarket} />
        </div>
      
    </main>
  )
}

export default SuppliersModule