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
import { contractSchema, supplierSchema,supplierEditSchema } from '../../schemas/suppliersSchema';
import { CreateSupplierErrors } from '../../utils/types/suppliersType';
import * as Yup from 'yup'


const SupplierDetail = () => {

  const params = useParams()

  const supplierId = parseInt(params.supplierId || "", 10);

  const { } = useGeneral()
  const { loading, error, supplierDetail, contractDetail, contracts, getSupplierContracts, createContract, deleteContract, getSupplier, getAllSuppliers } = useSuppliers()
  const { categories, states, currencies, countries, getAllCurrencies, getAllCategories, getAllStates, getAllCountries, } = useGeneral()

  useEffect(() => {
    getAllCategories()
    getAllStates()
    getAllCountries()
    getAllCurrencies()
  }, [getAllCategories, getAllCurrencies, getAllStates])

  useEffect(() => {
    getSupplier(supplierId)
    getSupplierContracts(true, true, undefined, supplierId.toString())
  }, [getSupplier, getSupplierContracts])


  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPageContracts, setCurrentPageContracts] = useState<number>(1);
  const [editable, setEditable] = useState(false);
  const [selectedDataContract, setSelectedDataContract] = useState<Array<string>>([]);
  const [editFormStates,setEditFormStates] = useState<Array<any>>([])
  const [editErrors, setEditErrors] = useState<CreateSupplierErrors>({
    category: "",
    email: "",
    country: "",
    name: "",
    phone: "",
    state: ""
  })
  const [createContractData, setCreateContractData] = useState<contractType>({
    supplier: `${supplierId}`,
    motive: "",
    expireDate: "",
    payDate: "",
    amount: "",
    currency: ""
  })
  const [createContractErrors, setCreateContractErrors] = useState<CreateContractErrors>({
    motive: "",
    expireDate: "",
    payDate: "",
    amount: "",
    currency: ""
  })

  const [editedData, setEditedData] = useState({
    category: "",
    email: "",
    country: "",
    name: "",
    phone: "",
    state: ""
  });

  const contractTableHeaders = [
    "Descripcion",
    "Fecha vencimiento",
    "Fecha pago",
    "Monto",
    "Moneda"
  ]

  //Pagination Contracts
  const indexEndContracts = currentPageContracts * dataLength;
  const indexStartContracts = indexEndContracts - dataLength;
  const nPagesContracts = Math.ceil(contracts.length / dataLength);
  const dataShownContracts = contracts.slice(indexStartContracts, indexEndContracts);

  const changePageContracts = (nextPage: number) => {
    setCurrentPageContracts(nextPage);
  };

  //Supplier
  const handleEditSubmit = async(e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
      const state = states.find(s => s.id == editedData.state);
      let data = {
        nombre: editedData.name ? editedData.name : undefined,
        correo: editedData.email ? editedData.email : undefined,
        telefono:editedData.phone? editedData.phone : undefined,
        Provincias_id:editedData.state ? editedData.state : undefined,
        Rubros_id:editedData.category ? editedData.category : undefined
      }
      if(Object.entries(data).every(d => d[1] == "" || d[1]==undefined)){
        setEditErrors({
          category: "Debe ingresar un dato",
          name:"Debe ingresar un dato",
          state:"Debe ingresar un dato",
          country:"Debe ingresar un dato"
        })
        throw new Error("No ingresó ningun dato")
      }
      
      await supplierEditSchema.validate(data, { abortEarly: false });
      

      const editData = Object.fromEntries(Object.entries(data).filter(d=> d[1]!=""));
      console.log(editData);
      

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

  const handleEditChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target;
    if(name == "country"){
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

  //*************

  //Contract
  const handleCreateContractSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    try {
      await contractSchema.validate(createContractData, { abortEarly: false });
      createContract(supplierId.toString(),createContractData);
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

  //*************

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
              <Input id={"telefonoProveedor"} name={"phone"} value={editedData.phone} title={"Teléfono"} type={"number"} placeholder={"543816341612"} onChange={handleEditChange} error={editErrors.phone}></Input>
              <Select error={editErrors.country} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleEditChange}></Select>
              <Select error={editErrors.state} id={"provincias"} name={"state"} title={"Provincia"} options={editFormStates} onChange={handleEditChange}></Select>
              <Select error={editErrors.category} id={"rubros"} name={"category"} title={"Rubro"} options={categories} onChange={handleEditChange}></Select>
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
                <button
                  onClick={handleClickEditable}
                  className="bg-primary flex text-white rounded px-6 py-2"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                  Editar
                </button>
              </div>
              {supplierDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{supplierDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">Correo</h4>
                  <p className="underline decoration-1">
                    {supplierDetail.correo ? supplierDetail.correo : "-"}
                  </p>
                  <h4 className="font-semibold text-lg">Teléfono</h4>
                  <p>{supplierDetail.telefono ? supplierDetail.telefono : "-"}</p>
                  <h4 className="font-semibold text-lg">Provincia</h4>
                  <p>{supplierDetail.Provincias?.nombre}</p>
                  <h4 className="font-semibold text-lg">Rubro</h4>
                  <p>{supplierDetail.Rubros?.nombre}</p>

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


        <Accordion title='Crear nuevo'>
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
            {dataShownContracts.map((contract, index) => (
              <TRow key={index} id={contract.id} detail={true}>
                <TData checkbox={true} id={contract.id} onChange={handleSelectedItemContract}>
                  {contract.descripcion}
                </TData>
                <TData>{contract.fechaVencimiento}</TData>
                <TData>{contract.fechaPago}</TData>
                <TData>{contract.monto}</TData>
                <TData>{contract.Monedas?.nombre}</TData>
              </TRow>
            ))}
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
          <Pagination changePage={changePageContracts} nPages={nPagesContracts} currentPage={currentPageContracts} indexStart={indexStartContracts} indexEnd={indexEndContracts} />
        </div>

      </main>

    </div>
  )
}

export default SupplierDetail