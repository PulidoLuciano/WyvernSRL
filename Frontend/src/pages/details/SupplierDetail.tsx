import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { useGeneral } from '../../hooks/useGeneral';
import useSuppliers from '../../hooks/useSuppliers';
import Select from "../../components/form/Select"
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import SaveButton from '../../components/form/SaveButton';
import Accordion from '../../components/Accordion';
import Table from '../../components/table/Table';
import TData from '../../components/table/TData';
import TRow from '../../components/table/TRow';
import { useParams } from 'react-router-dom';
import { contractType, CreateContractErrors } from '../../utils/types/contractType';
import Pagination from '../../components/Pagination';
import { contractSchema,purchaseSchema, supplierSchema, supplierEditSchema } from '../../schemas/suppliersSchema';
import { CreateSupplierErrors, suppliersType } from '../../utils/types/suppliersType';
import * as Yup from 'yup'
import { contractTableHeaders,purchasesSupplierTableHeaders,suppliersScores,breachesSupplierTableHeaders } from '../../utils/dataArrays';
import { purchaseType,CreatePurchaseErrors } from '../../utils/types/purchaseType';
import { useMarkets } from '../../hooks/useMarkets';

const SupplierDetail = () => {

  const params = useParams()

  const supplierId = parseInt(params.supplierId || "", 10);

  const { getMarkets, markets } = useMarkets()
  const { loading, error, supplierDetail, getSupplierPurchases, purchases, getSupplierBreaches, breaches, createPurchase, deletePurchase, contracts, getSupplierContracts, createContract, deleteContract, getSupplier, updateSupplier } = useSuppliers()
  const { states, currencies, countries, getAllCurrencies, getAllStates, getAllCountries,  } = useGeneral()

  useEffect(() => {
    getMarkets()
    getAllStates()
    getAllCountries()
    getAllCurrencies()
  }, [])

  useEffect(() => {
    getSupplier(supplierId)
    getSupplierPurchases(supplierId)
    getSupplierContracts(true, true, undefined, supplierId.toString())
    getSupplierBreaches(supplierId);
  }, [])

    
  useEffect(() => {
    if (supplierDetail) {
      setEditedData({
        category: supplierDetail.Rubros.id,
        email: supplierDetail.correo,
        country: supplierDetail.Provincias.Paises_id,
        name: supplierDetail.nombre,
        phone: supplierDetail.telefono,
        state: supplierDetail.Provincias.id,
        score: supplierDetail.calificacion.nombre
      })

      const previousStates = states.filter(s => s.Paises_id == supplierDetail.Provincias?.Paises_id);
      setEditFormStates(previousStates);
    }
    
  }, [supplierDetail])

  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPageContracts, setCurrentPageContracts] = useState<number>(1);
  const [currentPagePurchases,setCurrentPagePurchases] = useState<number>(1);
  const [currentPageBreaches,setCurrentPageBreaches] = useState<number>(1);
  const [editable, setEditable] = useState(false);
  const [selectedDataContract, setSelectedDataContract] = useState<Array<string>>([]);
  const [selectedDataPurchase,setSelectedDataPurchase] = useState<Array<string>>([]);
  const [selectedDataBreaches,setSelectedDataBreaches] = useState<Array<string>>([]);
  const [editFormStates, setEditFormStates] = useState<Array<any>>([]);
  const [editErrors, setEditErrors] = useState<CreateSupplierErrors>({
    category: "",
    email: "",
    country: "",
    name: "",
    phone: "",
    state: ""
  });
  const [createContractData, setCreateContractData] = useState<contractType>({
    supplier: `${supplierId}`,
    motive: "",
    expireDate: "",
    payDate: "",
    amount: "",
    currency: ""
  });
  const [createContractErrors, setCreateContractErrors] = useState<CreateContractErrors>({
    motive: "",
    expireDate: "",
    payDate: "",
    amount: "",
    currency: ""
  });

  const [editedData, setEditedData] = useState<suppliersType>({
    category: '',
    email: '',
    country: "",
    name: '',
    phone: "",
    state: ""
  });

  const [createPurchaseData, setCreatePurchaseData] = useState<purchaseType>({
    description:"",
    unitPrice:"",
    paid:"false",
    delivered:"false",
    purchaseDate:"",
    quantity:"",
    currency:"",
    supplier: supplierId.toString()
  })

  const [createPurchaseErrors, setCreatePurchaseErrors] = useState<CreatePurchaseErrors>({
    description:"",
    unitPrice:"",
    paid:"",
    delivered:"",
    purchaseDate:"",
    quantity:"",
    currency:""
  })

  const indexEndContracts = currentPageContracts * dataLength;
  const indexStartContracts = indexEndContracts - dataLength;
  const nPagesContracts = Math.ceil(contracts.length / dataLength);
  const dataShownContracts = contracts.slice(indexStartContracts, indexEndContracts);

  const indexEndPurchases = currentPagePurchases * dataLength;
  const indexStartPurchases = indexEndPurchases - dataLength;
  const nPagesPurchases = Math.ceil(purchases.length / dataLength);
  const dataShownPurchases = purchases.slice(indexStartPurchases, indexEndPurchases);

  const indexEndBreaches = currentPageBreaches * dataLength;
  const indexStartBreaches = indexEndBreaches - dataLength;
  const nPagesBreaches = Math.ceil(breaches.length / dataLength);
  const dataShownBreaches = breaches.slice(indexStartBreaches, indexEndBreaches);

  const changePageContracts = (nextPage: number) => {
    setCurrentPageContracts(nextPage);
  };

  const changePagePurchases = (nextPage: number) =>{
    setCurrentPagePurchases(nextPage);
  }

  const changePageBreaches = (nextPage: number) =>{
    setCurrentPageBreaches(nextPage);
  }

  //Supplier
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await supplierEditSchema.validate(editedData, { abortEarly: false });
      updateSupplier(supplierId, editedData);
      setEditErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const editErrors: CreateSupplierErrors = {};
        err.inner.forEach((error) => {
          if (error.path) editErrors[error.path as keyof CreateSupplierErrors] = error.message;
        });

        setEditErrors(editErrors);
        console.log(editErrors);

      }
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name == "country") {
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setEditFormStates(statesAvailables)
    }
    setEditedData({
      ...editedData,
      [name]: value
    });
  }

  const handleClickEditable = () => {
    setEditable(!editable);
  };

  //Contract
  const handleCreateContractSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    try {
      await contractSchema.validate(createContractData, { abortEarly: false });
      createContract(supplierId.toString(), createContractData);
      setCreateContractErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createContractErrors: CreateContractErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createContractErrors[error.path as keyof CreateContractErrors] =
              error.message;
        });

        setCreateContractErrors(createContractErrors);
      }
    }
  }

  const handleCreateContractChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCreateContractData({
      ...createContractData,
      [name]: value,
    });
  }

  const handleDeleteSelectedDataContract = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return;
    } else {
      const dataDelete = await deleteContract(supplierId.toString(), selectedData);
      if (dataDelete) console.log("contratos eliminados exitosamente");
      setSelectedDataContract([]);
    }
  }

  const handleSelectedItemContract = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    const dataExist = selectedDataContract.find((d) => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedDataContract.filter((d) => d != dataExist);
      setSelectedDataContract(newSelectedData);
    } else {
      setSelectedDataContract([...selectedDataContract, e.target.id]);
    }
  }

  const handleCreatePurchaseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    try {
      console.log(createPurchaseData);
      
      await purchaseSchema.validate(createPurchaseData, { abortEarly: false });
      createPurchase(supplierId, createPurchaseData);
      setCreatePurchaseErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createPurchaseErrors: CreatePurchaseErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createPurchaseErrors[error.path as keyof CreatePurchaseErrors] =
              error.message;
        });

        setCreatePurchaseErrors(createPurchaseErrors);
      }
    }
   }

  const handleCreatePurchaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target;
    
    setCreatePurchaseData({
      ...createPurchaseData,
      [name]: value,
    });
  }

  const handleSelectedItemPurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    const dataExist = selectedDataPurchase.find((d) => d == e.target.id);
    console.log(e.target.id);
    
    if (dataExist) {
      newSelectedData = selectedDataPurchase.filter((d) => d != dataExist);
      setSelectedDataPurchase(newSelectedData);
    } else {
      setSelectedDataPurchase([...selectedDataPurchase, e.target.id]);
    }
   }

  const handleDeleteSelectedDataPurchase = async (selectedData: Array<string>) => {
    if (!selectedData || selectedData.length == 0) {
      return;
    } else {
      const dataDelete = await deletePurchase(supplierId, selectedData);
      if (dataDelete) console.log("compras eliminadas exitosamente");
      setSelectedDataPurchase([]);
    }
   }

  if (loading) return <p>Cargando detalles del proveedor...</p>;

  return (
    <div className='w-full flex'>

      <Nav />

      <main className=' ms-72 p-8'>
        {supplierDetail ? (
          <h1 className="text-2xl">
            Visualización proveedor: {supplierDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización proveedor: ?</h1>
        )}

        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"nombreProveedor"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleEditChange} error={editErrors.name}></Input>
                  <Input id={"correoProveedor"} name={"email"} value={editedData.email} title={"Correo"} type={"email"} placeholder={"username@wyvern.com"} onChange={handleEditChange} error={editErrors.email}></Input>
                  <Input id={"telefonoProveedor"} name={"phone"} value={editedData.phone} title={"Teléfono"} type={"text"} placeholder={"543816341612"} onChange={handleEditChange} error={editErrors.phone}></Input>
                  <Select selected={supplierDetail.Provincias.Paises_id} error={editErrors.country} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleEditChange}></Select>
                  <Select selected={supplierDetail.Provincias.id} error={editErrors.state} id={"provincias"} name={"state"} title={"Provincia"} options={editFormStates} onChange={handleEditChange}></Select>
                  <Select selected={supplierDetail.Rubros.id} error={editErrors.category} id={"rubros"} name={"category"} title={"Rubro"} options={markets} onChange={handleEditChange}></Select>
                  <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del cliente</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {supplierDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{supplierDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">Correo</h4>
                  <p className={supplierDetail.correo? "underline decoration-1" : ""}>
                    {supplierDetail.correo ? supplierDetail.correo : "-"}
                  </p>
                  <h4 className="font-semibold text-lg">Teléfono</h4>
                  <p>{supplierDetail.telefono ? supplierDetail.telefono : "-"}</p>
                  <h4 className="font-semibold text-lg">Provincia</h4>
                  <p>{supplierDetail.Provincias?.nombre}</p>
                  <h4 className="font-semibold text-lg">Rubro</h4>
                  <p>{supplierDetail.Rubros?.nombre}</p>
                  <h4 className="font-semibold text-lg">Calificación</h4>
                  <p>{supplierDetail.calificacion?.nombre}</p>
                </>
              ) : (
                <>
                  <p>Proveedor no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}


        <Accordion title='Crear nuevo contrato'>
          <Form handleSubmit={handleCreateContractSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input name='motive' placeholder='Motivo en 1 frase' error={createContractErrors.motive} value={createContractData.motive} onChange={handleCreateContractChange} type='text' id='motivoContrato' title='Motivo' />
              <Input name='expireDate' placeholder={"2023-07-17"} error={createContractErrors.expireDate} value={createContractData.expireDate} onChange={handleCreateContractChange} type='text' id='fechaVencimientoContrato' title='Fecha de vencimiento' />
              <Input name='payDate' placeholder={"2023-07-17"} error={createContractErrors.payDate} value={createContractData.payDate} onChange={handleCreateContractChange} type='text' id='fechaPagoContrato' title='Fecha de pago' />
              <Input name='amount' placeholder='0.00' error={createContractErrors.amount} value={createContractData.amount} onChange={handleCreateContractChange} type='number' id='amountContrato' title='Monto' />
              <Select id='currencyContract' error={createContractErrors.currency} name='currency' onChange={handleCreateContractChange} options={currencies} title='Moneda' />
              <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Contratos con proveedor</h2>
            <p>Contratos: {contracts.length}</p>
          </div>

          <button onClick={() => handleDeleteSelectedDataContract(selectedDataContract)} className="bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6">
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedDataContract.length})
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <Table id='ContractsTable' headers={contractTableHeaders}>
            {
            dataShownContracts.length != 0?
              dataShownContracts.map((contract, index) => (
                <TRow key={index} id={contract.id} path='contracts' detail={true} handleDelete={()=>deleteContract(supplierId.toString(),[contract.id.toString()])} deleteButton={true}>
                  <TData checkbox={true} id={contract.id} onChange={handleSelectedItemContract}>
                    {contract.descripcion}
                  </TData>
                  <TData>{contract.fechaVencimiento}</TData>
                  <TData>{contract.fechaPago}</TData>
                  <TData>{contract.monto}</TData>
                  <TData>{contract.Monedas?.nombre}</TData>
                </TRow>
            )):
            <div className=''>No hay contratos</div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
          <Pagination changePage={changePageContracts} nPages={nPagesContracts} currentPage={currentPageContracts} indexStart={indexStartContracts} indexEnd={indexEndContracts} />
        </div>


        <Accordion title='Crear nueva compra'>
          <Form handleSubmit={handleCreatePurchaseSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input name='description' placeholder='Descripcion breve' error={createPurchaseErrors.description} value={createPurchaseData.description} onChange={handleCreatePurchaseChange} type='text' id='descripcionCompra' title='Descripción' />
              <Input name='unitPrice' placeholder={"0.00"} error={createPurchaseErrors.unitPrice} value={createPurchaseData.unitPrice} onChange={handleCreatePurchaseChange} type='number' id='precioUnitarioCompra' title='Precio unitario' />
              <Input name='quantity' placeholder={"0"} error={createPurchaseErrors.quantity} value={createPurchaseData.quantity} onChange={handleCreatePurchaseChange} type='number' id='cantidadCompra' title='Cantidad' />
              <Input name='purchaseDate' placeholder='2023-01-07' error={createPurchaseErrors.purchaseDate} value={createPurchaseData.purchaseDate} onChange={handleCreatePurchaseChange} type='text' id='fechaCompra' title='Fecha' />
              <Select id='entregadoCompra' error={createPurchaseErrors.delivered} name='delivered' onChange={handleCreatePurchaseChange} options={[{ id: "true", nombre: "Sí" }, { id: "false", nombre: "No" }]} title='Entregado' />
              <Select id='pagadoCompra' error={createPurchaseErrors.paid} name='paid' onChange={handleCreatePurchaseChange} options={[{ id: "true", nombre: "Sí" }, { id: "false", nombre: "No" }]} title='Pagado' />
              <Select id='monedaCompra' error={createPurchaseErrors.currency} name='currency' onChange={handleCreatePurchaseChange} options={currencies} title='Moneda' />
              <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
            </>
          </Form>
        </Accordion>

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Compras a proveedor</h2>
            <p>Compras: {purchases.length}</p>
          </div>

          <button onClick={() => handleDeleteSelectedDataPurchase(selectedDataPurchase)} className="bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6">
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados ({selectedDataPurchase.length})
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <Table id='PurchasesTable' headers={purchasesSupplierTableHeaders}>
            {
            dataShownPurchases.length != 0 ?
            dataShownPurchases.map((purchase, index) => (
              <TRow key={index} path='purchases' handleDelete={()=> deletePurchase(supplierId,[purchase.id.toString()])} id={purchase.id} detail={true} deleteButton={true} >
                <TData checkbox={true} id={purchase.id} onChange={handleSelectedItemPurchase}>
                  {purchase.descripcion}
                </TData>
                <TData>{purchase.precioUnitario}</TData>
                <TData>{purchase.Monedas?.nombre}</TData>
                <TData>{purchase.cantidad}</TData>
                <TData>{purchase.fechaCompra}</TData>
                <TData>{purchase.entregado? "Sí" : "No"}</TData>
                <TData>{purchase.pagado? "Sí" : "No"}</TData>
                
              </TRow>
            )):
            <div className=''>No hay compras </div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
          <Pagination changePage={changePagePurchases} nPages={nPagesPurchases} currentPage={currentPagePurchases} indexStart={indexStartPurchases} indexEnd={indexEndPurchases} />
        </div>

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Incumplimientos del proveedor</h2>
            <p>Incumplimientos: {breaches.length}</p>
          </div>

         
        </div>

        <div className="overflow-x-auto mt-6">
          <Table id='ContractsTable' headers={breachesSupplierTableHeaders}>
            {
            dataShownBreaches.length != 0 ?
            dataShownBreaches.map((breache, index) => (
              <TRow key={index} id={breache.id} detail={true} >
                <TData id={breache.id}>
                  {breache.descripcion}
                </TData>
                <TData>{breache.fecha}</TData>
                <TData>{breache.Compras_id? breache.Compras_id : ""}{breache.Contratos_id? breache.Contratos_id : ""}</TData> 
                <TData>{breache.NivelDeIncumplimiento?.nombre ?  breache.NivelDeIncumplimiento?.nombre : ""}</TData>
              </TRow>
            )):
            <div className=''>No hay incumplimientos </div>   
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
          <Pagination changePage={changePageBreaches} nPages={nPagesBreaches} currentPage={currentPageBreaches} indexStart={indexStartBreaches} indexEnd={indexEndBreaches} />
        </div>


      </main>

    </div>
  )
}

export default SupplierDetail