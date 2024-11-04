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
import useSales from '../hooks/useSales';
import { CreateSaleErrors, saleType } from '../utils/types/saleType';
import * as Yup from 'yup'
import { saleSchema } from '../schemas/salesSchema';
import { useClients } from '../hooks/useClients';
import { useGeneral } from '../hooks/useGeneral';
import { salesTableHeaders } from '../utils/dataArrays';

const SalesModule = () => {

  const { sales, loading, error, createSale, deleteSale, getAllSales } = useSales()
  const { clients, getAllClients } = useClients()
  const { products, getAllProducts } = useGeneral()
  useEffect(() => {
    getAllSales(true, true)
    getAllProducts();
    getAllClients()
  }, [])

  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [createErrors, setCreateErrors] = useState<CreateSaleErrors>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [createData, setCreateData] = useState<saleType>({
    client: '',
    product: '',
    date: '',
  });

  const [filterData, setFilterData] = useState<saleType>({
    client: '',
    product: '',
    date: ''
  });

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(sales.length / dataLength);
  const dataShown = sales.slice(indexStart, indexEnd);
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
      const dataDelete = await deleteSale(selectedData);
      if (dataDelete) console.log("ventas eliminadas exitosamente");
      setSelectedData([])
    }

  }


  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {


      const clientExist = clients.find(c => c.nombre == createData.client);
      

      if (clientExist == undefined) {
        setCreateErrors({ ...createErrors, client: "Este cliente no existe" })
        throw new Error("Este cliente no existe")
      }


      await saleSchema.validate(createData, { abortEarly: false });
      const data: saleType = {
        client: clientExist.id,
        date: createData.date,
        product: createData.product
      }
      createSale(data)
      setCreateErrors({});
    } catch (err: any) {
      console.log(err);

      if (err instanceof Yup.ValidationError) {

        const createErrors: CreateSaleErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createErrors[error.path as keyof CreateSaleErrors] = error.message;
        });

        setCreateErrors(createErrors);
        console.log(createErrors);

      }
    }
  }



  const handleFilterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const client = clients.find(c => c.nombre == filterData.client);
    const fechaISO = filterData.date? new Date(filterData.date).toISOString() : "";
    const data = {
      fecha: fechaISO,
      Clientes_id: client ? client.id : "",
      Productos_id: filterData.product
    }
   
  
    const datos = Object.entries(data);

    const filter: Array<string> = []
    datos.forEach((d, index) => {
      if (d[1] != "" && index == 0) {
        filter.push(`?${d[0]}=${d[1]}`) 
      }
      else if (d[1] != "") {
        filter.push(`&${d[0]}=${d[1]}`)
      }
    })

    getAllSales(true, true, filter.join(""));

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
              <Input error={createErrors.client} id={"nombreUsuario"} name={"client"} value={createData.client} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleCreateChange} ></Input>
              <Select error={createErrors.product} id={"productos"} title={"Productos"} name={"product"} options={products} onChange={handleCreateChange}></Select>
              <Input error={createErrors.date} id={"fecha"} name={"date"} value={createData.date} title={"Fecha"} type={"text"} placeholder={"2023-07-17"} onChange={handleCreateChange} ></Input>
              <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
            </>
          </Form>
        </Accordion>
        <Accordion title="Filtrar por">
          <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
            <>
              <Input id={"nombreUsuario"} name={"client"} value={filterData.client} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleFilterChange} error=''></Input>
              <Select id={"productos"} title={"Productos"} name={"product"} options={products} onChange={handleFilterChange}></Select>
              <Input id={"fecha"} name={"date"} value={filterData.date} title={"Fecha"} type={"text"} placeholder={"2023-07-17"} onChange={handleFilterChange} error=''></Input>
              <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>


        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Ventas</h2>
            <p>Página 1 de 20</p>
          </div>

          <button onClick={() => handleDeleteSelectedData(selectedData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedData.length})
          </button>

        </div>

        <div className='overflow-x-auto mt-6'>
          {loading && <p>Cargando clientes...</p>}
          {error ? <p>Error: {error}</p> :
          <Table id="SalesTable" headers={salesTableHeaders}>
            {
              dataShown.map((sale, index) => {
                return (
                  <TRow key={index} id={sale.id} path='sales' detail={true}>
                    <TData onChange={handleSelectedItem} id={sale.id} checkbox={true}>{sale.Clientes?.nombre}</TData>
                    <TData>{sale.Productos?.nombre}</TData>
                    <TData>{sale.fecha}</TData>
                  </TRow>)
              })
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

export default SalesModule