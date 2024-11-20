import { useEffect, useState } from 'react'
import { useGeneral } from '../../hooks/useGeneral'
import { useParams } from 'react-router-dom'
import Form from '../../components/form/Form'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import Nav from '../../components/Nav'
import SaveButton from '../../components/form/SaveButton'
import * as Yup from 'yup'
import Accordion from '../../components/Accordion'
import Table from '../../components/table/Table'
import TData from '../../components/table/TData'
import TRow from '../../components/table/TRow'
import { breachesContractTableHeaders } from '../../utils/dataArrays'
import Pagination from '../../components/Pagination'
import { breacheType, CreateBreacheErrors } from '../../utils/types/breacheType'
import { breacheSchema } from '../../schemas/breacheSchema'
import { CreatePurchaseErrors, purchaseType } from '../../utils/types/purchaseType'
import usePurchases from '../../hooks/usePurchases'
import { purchaseSchema } from '../../schemas/suppliersSchema'

const PurchaseDetail = () => {

  const params = useParams()

  const purchaseId = parseInt(params.purchaseId || "", 10);

  const [editable, setEditable] = useState<boolean>(false)
  const [dataLength, setDataLength] = useState<number>(10);
  const { breaches, currencies, getAllCurrencies, getAllBreaches } = useGeneral()
  const { purchaseDetail, purchaseBreaches, error, createBreache, getPurchase, getPurchaseBreaches, deletePurchaseBreaches, updatePurchase } = usePurchases()
  const [currentPageBreaches, setCurrentPageBreaches] = useState<number>(1);

  const [editErrors, setEditErrors] = useState<CreatePurchaseErrors>({
    currency: "",
    delivered: "",
    description: "",
    paid: "",
    purchaseDate: "",
    quantity: "",
    unitPrice: ""
  })
  const [editedData, setEditedData] = useState<purchaseType>({
    supplier: "",
    currency: "",
    delivered: "",
    description: "",
    paid: "",
    purchaseDate: null,
    quantity: "",
    unitPrice: ""
  })

  const [createBreacheData, setCreateBreacheData] = useState<breacheType>({
    purchaseId: purchaseId.toString(),
    date: null,
    breachLevel: "",
    description: ""
  })

  const [createBreacheErrors, setCreateBreacheErrors] = useState<CreateBreacheErrors>({
    date: "",
    breachLevel: "",
    description: ""
  })

  const indexEndBreaches = currentPageBreaches * dataLength;
  const indexStartBreaches = indexEndBreaches - dataLength;
  const nPagesBreaches = Math.ceil(purchaseBreaches.length / dataLength);
  const dataShownBreaches = purchaseBreaches.slice(indexStartBreaches, indexEndBreaches);

  const changePageBreaches = (nextPage: number) => {
    setCurrentPageBreaches(nextPage);
  }

  useEffect(() => {
    getAllCurrencies()
    getAllBreaches()
  }, [])

  useEffect(() => {
    getPurchase(purchaseId, true, true);
    getPurchaseBreaches(purchaseId);
  }, [])

  useEffect(() => {

    if (purchaseDetail) {
      setEditedData({
        currency: purchaseDetail.Monedas?.id,
        delivered: purchaseDetail.entregado,
        paid: purchaseDetail.pagado,
        description: purchaseDetail.descripcion,
        purchaseDate: purchaseDetail.fechaCompra?.slice(0, 10),
        quantity: purchaseDetail.cantidad,
        unitPrice: purchaseDetail.precioUnitario,
        supplier: purchaseDetail.Proveedores?.id
      })
    }

  }, [purchaseDetail])

  const handleClickEditable = () => {
    setEditable(!editable);
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    e.currentTarget.children;


    try {
      await purchaseSchema.validate(editedData, { abortEarly: false });
      updatePurchase(purchaseId, editedData);
      setEditErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createPurchaseErrors: CreatePurchaseErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createPurchaseErrors[error.path as keyof CreatePurchaseErrors] =
              error.message;
        });

        setEditErrors(createPurchaseErrors);
      }
    }



  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEditedData({
      ...editedData,
      [name]: value,
    });
  }

  const handleCreateBreacheChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCreateBreacheData({
      ...createBreacheData,
      [name]: value,
    });
  }

  const handleCreateBreacheSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    e.currentTarget.children;
    console.log(createBreacheData);

    try {
      await breacheSchema.validate(createBreacheData, { abortEarly: false });
      createBreache(createBreacheData);
      setCreateBreacheErrors({});
      setCreateBreacheData({
        purchaseId: purchaseId.toString(),
        date: null,
        breachLevel: "",
        description: ""
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createBreacheErrors: CreateBreacheErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createBreacheErrors[error.path as keyof CreateBreacheErrors] =
              error.message;
        });

        setCreateBreacheErrors(createBreacheErrors);
      }
    }



  }



  return (




    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative'>
      {purchaseDetail ? (
        <h1 className="text-2xl">
          Visualización Compra: {purchaseDetail.id}
        </h1>
      ) : (
        <h1 className="text-2xl">Visualización proveedor: ?</h1>
      )}

      {editable ? (
        <>
          <div className="my-6">
            <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
              <>
                <Input name='description' placeholder='Descripcion breve' error={editErrors.description} value={editedData.description} onChange={handleEditChange} type='text' id='descripcionCompra' title='Descripción' />
                <Input name='unitPrice' placeholder={"0.00"} error={editErrors.unitPrice} value={editedData.unitPrice} onChange={handleEditChange} type='number' id='precioUnitarioCompra' title='Precio unitario' />
                <Input name='quantity' placeholder={"0"} error={editErrors.quantity} value={editedData.quantity} onChange={handleEditChange} type='number' id='cantidadCompra' title='Cantidad' />
                <Input name='purchaseDate' error={editErrors.purchaseDate} value={editedData.purchaseDate} onChange={handleEditChange} type='date' id='fechaCompra' title='Fecha' />
                <Select id='entregadoCompra' selected={purchaseDetail.entregado.toString()} error={editErrors.delivered} name='delivered' onChange={handleEditChange} options={[{ id: "true", nombre: "Sí" }, { id: "false", nombre: "No" }]} title='Entregado' />
                <Select id='pagadoCompra' selected={purchaseDetail.pagado.toString()} error={editErrors.paid} name='paid' onChange={handleEditChange} options={[{ id: "true", nombre: "Sí" }, { id: "false", nombre: "No" }]} title='Pagado' />
                <Select id='monedaCompra' selected={purchaseDetail.Monedas?.id} error={editErrors.currency} name='currency' onChange={handleEditChange} options={currencies} title='Moneda' />
                <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
              </>
            </Form>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 my-6">
            <div className="col-span-2 flex gap-x-3 mb-4">
              <h2 className="text-xl">Datos de la compra</h2>
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
            {purchaseDetail ? (
              <>
                <h4 className="font-semibold text-lg">Proveedor</h4>
                <p>{purchaseDetail.Proveedores?.nombre}</p>
                <h4 className="font-semibold text-lg">Descripción</h4>
                <p>
                  {purchaseDetail.descripcion}
                </p>
                <h4 className="font-semibold text-lg">Fecha</h4>
                <p>{purchaseDetail.fechaCompra?.slice(0, 10)}</p>
                <h4 className="font-semibold text-lg">Entregado</h4>
                <p>{purchaseDetail.entregado ? "Sí" : "No"}</p>
                <h4 className="font-semibold text-lg">Pagado</h4>
                <p>{purchaseDetail.pagado ? "Sí" : "No"}</p>
                <h4 className="font-semibold text-lg">Precio unitario</h4>
                <p>{purchaseDetail.precioUnitario}</p>
                <h4 className="font-semibold text-lg">Moneda</h4>
                <p>{purchaseDetail.Monedas?.nombre}</p>
                <h4 className="font-semibold text-lg">Cantidad</h4>
                <p>{purchaseDetail.cantidad}</p>
                <h4 className="font-semibold text-lg">Precio Total</h4>
                <p>{purchaseDetail.precioUnitario * purchaseDetail.cantidad}</p>
              </>
            ) : (
              <>
                <p>Compra no encontrada</p>
                <p>{error}</p>;
              </>
            )}
          </div>
        </>
      )}

      <Accordion title='Crear nuevo incumplimiento'>
        <Form handleSubmit={handleCreateBreacheSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
          <>
            <Input id='descripcionIncumplimiento' name='description' onChange={handleCreateBreacheChange} placeholder='Descripción breve' title='Descripción' type='text' error={createBreacheErrors.description} value={createBreacheData.description} />
            <Input id='fechaIncumplimiento' name='date' onChange={handleCreateBreacheChange} placeholder='2023-01-07' title='Fecha' type='date' error={createBreacheErrors.date} value={createBreacheData.date} />
            <Select id='nivelIncumplimiento' name='breachLevel' onChange={handleCreateBreacheChange} options={breaches} title='Nivel de incumplimiento' error={createBreacheErrors.breachLevel} />
            <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
          </>

        </Form>

      </Accordion>



      <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
        <div className="flex flex-col gap-2 items-start tablet:col-span-2">
          <h2 className="text-3xl">Incumplimientos del contrato:</h2>
          <p>Incumplimientos: {purchaseBreaches.length}</p>
        </div>


      </div>

      <div className="overflow-x-auto mt-6">
        <Table id='ContractsTable' headers={breachesContractTableHeaders}>
          {dataShownBreaches.map((breache, index) => (
            <TRow key={index} id={breache.id} handleDelete={() => deletePurchaseBreaches(purchaseId, [breache.id.toString()])} deleteButton={true} >
              <TData id={breache.id}>{breache.id}</TData>
              <TData>{breache.descripcion}</TData>
              <TData>{breache.fecha?.slice(0, 10)}</TData>
              <TData>{breache.NivelDeIncumplimiento?.nombre ? breache.NivelDeIncumplimiento?.nombre : ""}</TData>
            </TRow>
          ))}
        </Table>
      </div>

      <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
        <Pagination changePage={changePageBreaches} nPages={nPagesBreaches} currentPage={currentPageBreaches} indexStart={indexStartBreaches} indexEnd={indexEndBreaches} />
      </div>


    </main>



  )
}

export default PurchaseDetail