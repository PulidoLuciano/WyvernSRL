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
import { salesTableHeaders, productsTableHeaders } from '../utils/dataArrays';
import { productType, CreateProductErrors } from '../utils/types/productType';
import { productSchema } from '../schemas/productSchema';
import { useProducts } from '../hooks/useProducts';
import { Link } from "react-router-dom";

const SalesModule = () => {

  const { sales, loading, error, createSale, deleteSale, getAllSales } = useSales()
  const { getAllProducts, products, deleteProducts, createProduct, loadingProducts } = useProducts()
  const { clients, getAllClients } = useClients()
  const { gamesCategories, errorGeneral, getAllGamesCategories } = useGeneral()
  useEffect(() => {
    getAllSales(true, true)
    getAllProducts(true);
    getAllClients();
    getAllGamesCategories();
  }, [])

  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentPageProducts, setCurrentPageProducts] = useState<number>(1)
  const [createErrors, setCreateErrors] = useState<CreateSaleErrors>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [selectedProductsData, setSelectedProductsData] = useState<Array<string>>([])
  const [createProductErrors, setCreateProductErrors] = useState<CreateProductErrors>({
    name: '',
    price: '',
    date: '',
    category: ''
  })

  const [createProductData, setCreateProductData] = useState<productType>({
    name: '',
    price: '',
    date: null,
    category: ''
  });

  const [createData, setCreateData] = useState<saleType>({
    client: '',
    product: '',
    date: null,
  });

  const [filterData, setFilterData] = useState<saleType>({
    client: '',
    product: '',
    date: ''
  });

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(sales.length / dataLength);
  const dataShown = sales.slice(indexStart, indexEnd);

  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }

  const indexEndProducts = currentPageProducts * dataLength;
  const indexStartProducts = indexEndProducts - dataLength;
  const nPagesProducts = Math.ceil(products.length / dataLength);
  const dataShownProducts = products.slice(indexStartProducts, indexEndProducts);
  const changePageProducts = (nextPage: number) => {
    setCurrentPageProducts(nextPage);
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


      await saleSchema.validate(createData, { abortEarly: false });

      if (clientExist == undefined) {
        setCreateErrors({ ...createErrors, client: "Este cliente no existe" })
        throw new Error("Este cliente no existe")
      }

      const data: saleType = {
        client: clientExist.id,
        date: createData.date,
        product: createData.product
      }
      createSale(data)
      setCreateErrors({});
      setCreateData({
        client: '',
        product: '',
        date: '',
      })
    } catch (err: any) {

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
    const fechaISO = filterData.date ? new Date(filterData.date).toISOString() : "";
    const data = {
      fecha: fechaISO,
      Clientes_id: client ? client.id : "",
      Productos_id: filterData.product
    }


    const datos = Object.entries(data);
    if (datos.length == 2) return;

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


  const handleSelectedItemProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData
    const dataExist = selectedProductsData.find(d => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedProductsData.filter(d => d != dataExist);
      setSelectedProductsData(newSelectedData)
    }
    else {
      setSelectedProductsData([...selectedProductsData, e.target.id]);
    }

  }

  const handleDeleteSelectedProducts = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return
    } else {
      const dataDelete = await deleteProducts(selectedData);
      if (dataDelete) console.log("productos eliminados exitosamente");
      setSelectedProductsData([])
    }

  }


  const handleCreateProductsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      await productSchema.validate(createProductData, { abortEarly: false });
      createProduct(createProductData)
      setCreateErrors({});
      setCreateProductData({
        name: '',
        price: '',
        date: '',
        category: ''
      })
    } catch (err: any) {
      console.log(err);

      if (err instanceof Yup.ValidationError) {

        const createProductErrors: CreateProductErrors = {};
        err.inner.forEach((error) => {
          if (error.path) createProductErrors[error.path as keyof CreateProductErrors] = error.message;
        });

        setCreateProductErrors(createProductErrors);
        console.log(createProductErrors);

      }
    }
  }

  const handleCreateProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateProductData({
      ...createProductData,
      [name]: value
    });
  }

  return (
    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative'>


      <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
        <h1 className='text-4xl'>Modulo Ventas</h1>
        <p>Ver, crear, editar y eliminar Ventas</p>
      </div>

      <Accordion title="Crear Nuevo">
        <Form handleSubmit={handleCreateSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
          <>
            <Input error={createErrors.client} id={"nombreUsuario"} name={"client"} value={createData.client} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleCreateChange} ></Input>
            <Select selected={createData.product} error={createErrors.product} id={"productos"} title={"Productos"} name={"product"} options={products} onChange={handleCreateChange}></Select>
            <Input error={createErrors.date} id={"fecha"} name={"date"} value={createData.date} title={"Fecha"} type={"date"} placeholder={"2023-07-17"} onChange={handleCreateChange} ></Input>
            <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
          </>
        </Form>
      </Accordion>
      <Accordion title="Filtrar por">
        <Form handleSubmit={handleFilterSubmit} className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32'>
          <>
            <Select id={"productos"} title={"Productos"} name={"product"} options={products} onChange={handleFilterChange}></Select>
            <FilterButton className={"text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-end"} />
          </>
        </Form>
      </Accordion>

      <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
        <div className='flex gap-2 items-end tablet:col-span-2'>
          <h2>Ventas</h2>
          <p>Página {currentPage} de {nPages}</p>
        </div>

        <button onClick={() => handleDeleteSelectedData(selectedData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center tablet:col-start-3 px-2 tablet:gap-0 laptopL:col-start-5 laptopL:col-end-6'>
          <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
          </svg>
          Eliminar Seleccionados ({selectedData.length})
        </button>
        <Link to="/charts" className='bg-primary font-semibold laptopL:col-start-6 laptopL:col-end-7 rounded flex items-center justify-center text-white'>
          <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3V19H21V21H3V3H5ZM20.2929 6.29289L21.7071 7.70711L16 13.4142L13 10.415L8.70711 14.7071L7.29289 13.2929L13 7.58579L16 10.585L20.2929 6.29289Z"></path>
          </svg>
          <button >
            Estadisticas de ventas
          </button>
        </Link>

      </div>

      <div className='overflow-x-auto mt-6'>
        {loading && <p>Cargando ventas...</p>}
        {error ? <p>Error: {error}</p> :
          <Table id="SalesTable" headers={salesTableHeaders}>
            {
              dataShown.length != 0 ?
                dataShown.map((sale, index) => {
                  return (
                    <TRow key={index} id={sale.id} handleDelete={() => deleteSale([sale.id.toString()])} deleteButton={true} path='sales' detail={true}>
                      <TData onChange={handleSelectedItem} id={sale.id} checkbox={true}>{sale.Clientes?.nombre}</TData>
                      <TData>{sale.Productos?.nombre}</TData>
                      <TData>{sale.fecha?.slice(0, 10)}</TData>
                    </TRow>)
                }) :
                <div className=''>No hay ventas con esas caracteristicas</div>
            }
          </Table>
        }
      </div>


      <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

        <Pagination changePage={changePage} nPages={nPages} currentPage={currentPage} indexStart={indexStart} indexEnd={indexEnd} />

      </div>


      <Accordion title="Crear nuevo producto">
        <Form handleSubmit={handleCreateProductsSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
          <>
            <Input error={createProductErrors.name} id={"nombreProducto"} name={"name"} value={createProductData.name} title={"Nombre del Producto"} type={"text"} placeholder={"Wyvern Game"} onChange={handleCreateProductChange} ></Input>
            <Input error={createProductErrors.price} id={"precioProducto"} name={"price"} value={createProductData.price} title={"Precio"} type={"number"} placeholder={"0.00"} onChange={handleCreateProductChange} ></Input>
            <Input error={createProductErrors.date} id={"fechaLanzamientoProducto"} name={"date"} value={createProductData.date} title={"Fecha de lanzamiento"} type={"date"} placeholder={"2023-07-17"} onChange={handleCreateProductChange} ></Input>
            <Select selected={createProductData.category} error={createProductErrors.category} id={"categoriaProducto"} title={"Categoría"} name={"category"} options={gamesCategories} onChange={handleCreateProductChange}></Select>
            <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
          </>
        </Form>
      </Accordion>

      <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
        <div className='flex gap-2 items-end tablet:col-span-2'>
          <h2>Productos</h2>
          <p>Página {currentPageProducts} de {nPagesProducts}</p>
        </div>

        <button onClick={() => handleDeleteSelectedProducts(selectedProductsData)} className='bg-red font-semibold text-sm rounded flex items-center justify-center px-2 tablet:col-start-3 tablet:gap-1 laptopL:col-start-6  laptopL:col-end-6'>
          <svg className="w-8 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
          </svg>
          Eliminar Seleccionados ({selectedProductsData.length})
        </button>

      </div>

      <div className='overflow-x-auto mt-6'>
        {loadingProducts && <p>Cargando productos...</p>}
        {errorGeneral ? <p>Error: {errorGeneral}</p> :
          <Table id="SalesTable" headers={productsTableHeaders}>
            {
              dataShownProducts.length != 0 ?
                dataShownProducts.map((product, index) => {
                  return (
                    <TRow key={index} id={product.id} handleDelete={() => deleteProducts([product.id.toString()])} path='products' deleteButton={true} detail={true}>
                      <TData onChange={handleSelectedItemProducts} id={product.id} checkbox={true}>{product.nombre}</TData>
                      <TData>{product.precio}</TData>
                      <TData>{product.lanzamiento?.slice(0, 10)}</TData>
                      <TData>{product.Categorias?.nombre}</TData>

                    </TRow>)
                }) :
                <div className=''>No hay productos</div>
            }
          </Table>
        }
      </div>

      <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

        <Pagination changePage={changePageProducts} nPages={nPagesProducts} currentPage={currentPageProducts} indexStart={indexStartProducts} indexEnd={indexEndProducts} />

      </div>


    </main>
  )
}

export default SalesModule