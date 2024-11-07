import React, { useEffect, useState } from 'react'
import { useGeneral } from '../../hooks/useGeneral'
import { useParams } from 'react-router-dom'
import useContracts from '../../hooks/useContracts'
import { contractType, CreateContractErrors } from '../../utils/types/contractType'
import Form from '../../components/form/Form'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import Nav from '../../components/Nav'
import SaveButton from '../../components/form/SaveButton'
import { contractSchema } from '../../schemas/suppliersSchema'
import * as Yup from 'yup'
import Accordion from '../../components/Accordion'
import Table from '../../components/table/Table'
import TData from '../../components/table/TData'
import TRow from '../../components/table/TRow'
import { breachesContractTableHeaders } from '../../utils/dataArrays'
import Pagination from '../../components/Pagination'
import { breacheType,CreateBreacheErrors } from '../../utils/types/breacheType'
import { breacheSchema } from '../../schemas/breacheSchema'

const ContractDetail = () => {

    const { breaches,currencies, getAllCurrencies,getAllBreaches } = useGeneral()
    
    const { contractDetail,contractBreaches,loadingContract,error,deleteContractBreaches, getContract, updateContract,getContractBreaches,createBreache } = useContracts()
    const params = useParams();
    const contractId = parseInt(params.contractId || "", 10);
    const [editable, setEditable] = useState<boolean>(false)
    const [dataLength, setDataLength] = useState<number>(10);
    const [currentPageBreaches, setCurrentPageBreaches] = useState<number>(1);

    const [editErrors, setEditErrors] = useState<CreateContractErrors>({
        amount: "",
        currency: "",
        expireDate: "",
        motive: "",
        payDate: ""
    })
    const [editedData, setEditedData] = useState<contractType>({
        motive: "",
        amount: "",
        currency: "",
        expireDate: "",
        payDate: "",
        supplier: "",
    })

    const [createBreacheData, setCreateBreacheData] = useState<breacheType>({
        contractId: contractId.toString(),
        date:"",
        breachLevel:"",
        description:""
    })
    
    const [createBreacheErrors, setCreateBreacheErrors] = useState<CreateBreacheErrors>({
        date:"",
        breachLevel:"",
        description:""
    })

    const indexEndBreaches = currentPageBreaches * dataLength;
    const indexStartBreaches = indexEndBreaches - dataLength;
    const nPagesBreaches = Math.ceil(contractBreaches.length / dataLength);
    const dataShownBreaches = contractBreaches.slice(indexStartBreaches, indexEndBreaches);

    const changePageBreaches = (nextPage: number) => {
        setCurrentPageBreaches(nextPage);
    }

    useEffect(() => {
        getAllCurrencies()
        getAllBreaches()
    }, [])

    useEffect(() => {
        getContract(contractId, true, true);
        getContractBreaches(contractId)

    }, [])

    useEffect(() => {

        if (contractDetail) {
            
            setEditedData({
                supplier: contractDetail.Proveedores?.id,
                amount: contractDetail.monto,
                currency: contractDetail.Monedas?.id,
                expireDate: contractDetail.fechaVencimiento,
                motive: contractDetail.descripcion,
                payDate: contractDetail.fechaPago
            })
        }

    }, [contractDetail])

    const handleClickEditable = () => {
        setEditable(!editable);
    }

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        e.currentTarget.children;
        
        
        try {
            await contractSchema.validate(editedData, { abortEarly: false });
            updateContract(contractId, editedData);
            setEditErrors({});
            handleClickEditable()
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const createContractErrors: CreateContractErrors = {};
                err.inner.forEach((error) => {
                    if (error.path)
                        createContractErrors[error.path as keyof CreateContractErrors] =
                            error.message;
                });

                setEditErrors(createContractErrors);
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

    if (loadingContract) return <p>Cargando detalles del contrato...</p>;

    return (
        <div className='w-full flex'>

            <Nav />

            <main className=' ms-72 p-8'>
                {contractDetail ? (
                    <h1 className="text-2xl">
                        Visualización contrato: {contractDetail.id}
                    </h1>
                ) : (
                    <h1 className="text-2xl">Visualización proveedor: ?</h1>
                )}

                {editable ? (
                    <>
                        <div className="my-6">
                            <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                                <>
                                    <Input name='motive' placeholder='Motivo en 1 frase' error={editErrors.motive} value={editedData.motive} onChange={handleEditChange} type='text' id='motivoContrato' title='Motivo' />
                                    <Input name='expireDate' placeholder={"2023-07-17"} error={editErrors.expireDate} value={editedData.expireDate} onChange={handleEditChange} type='text' id='fechaVencimientoContrato' title='Fecha de vencimiento' />
                                    <Input name='payDate' placeholder={"2023-07-17"} error={editErrors.payDate} value={editedData.payDate} onChange={handleEditChange} type='text' id='fechaPagoContrato' title='Fecha de pago' />
                                    <Input name='amount' placeholder='0.00' error={editErrors.amount} value={editedData.amount} onChange={handleEditChange} type='number' id='amountContrato' title='Monto' />
                                    <Select id='currencyContract' selected={contractDetail.Monedas?.id} error={editErrors.currency} name='currency' onChange={handleEditChange} options={currencies} title='Moneda' />
                                    <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
                                </>
                            </Form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 my-6">
                            <div className="col-span-2 flex gap-x-3 mb-4">
                                <h2 className="text-xl">Datos del contrato</h2>
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
                            {contractDetail ? (
                                <>
                                    <h4 className="font-semibold text-lg">Proveedor</h4>
                                    <p>{contractDetail.Proveedores?.nombre}</p>
                                    <h4 className="font-semibold text-lg">Motivo</h4>
                                    <p>
                                        {contractDetail.descripcion}
                                    </p>
                                    <h4 className="font-semibold text-lg">Fecha de vencimiento</h4>
                                    <p>{contractDetail.fechaVencimiento}</p>
                                    <h4 className="font-semibold text-lg">Fecha de pago</h4>
                                    <p>{contractDetail.fechaPago}</p>
                                    <h4 className="font-semibold text-lg">Monto</h4>
                                    <p>{contractDetail.monto}</p>
                                    <h4 className="font-semibold text-lg">Moneda</h4>
                                    <p>{contractDetail.Monedas?.nombre}</p>
                                </>
                            ) : (
                                <>
                                    <p>Contrato no encontrado</p>
                                    <p>{error}</p>;
                                </>
                            )}
                        </div>
                    </>
                )}

                <Accordion title='Crear nuevo incumplimiento'>
                    <Form handleSubmit={handleCreateBreacheSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                        <>
                            <Input  id='descripcionIncumplimiento' name='description' onChange={handleCreateBreacheChange} placeholder='Descripción breve' title='Descripción' type='text' error={createBreacheErrors.description} value={createBreacheData.description}/>
                            <Input  id='fechaIncumplimiento' name='date' onChange={handleCreateBreacheChange} placeholder='2023-01-07' title='Fecha' type='text' error={createBreacheErrors.date} value={createBreacheData.date}/>
                            <Select id='nivelIncumplimiento' name='breachLevel' onChange={handleCreateBreacheChange} options={breaches} title='Nivel de incumplimiento' error={createBreacheErrors.breachLevel}/>
                            <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"} />
                        </>

                    </Form>

                </Accordion>



                <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
                    <div className="flex flex-col gap-2 items-start tablet:col-span-2">
                        <h2 className="text-3xl">Incumplimientos del contrato:</h2>
                        <p>Incumplimientos: {contractBreaches.length}</p>
                    </div>


                </div>

                <div className="overflow-x-auto mt-6">
                    <Table id='ContractsTable' headers={breachesContractTableHeaders}>
                        {dataShownBreaches.map((breache, index) => (
                            <TRow key={index} id={breache.id} handleDelete={()=>deleteContractBreaches(contractId,[breache.id.toString()])} deleteButton={true} >
                                <TData id={breache.id}>{breache.id}</TData>
                                <TData>{breache.descripcion}</TData>
                                <TData>{breache.fecha}</TData>
                                <TData>{breache.NivelDeIncumplimiento?.nombre ? breache.NivelDeIncumplimiento?.nombre : ""}</TData>
                            </TRow>
                        ))}
                    </Table>
                </div>

                <div className="flex items-center justify-center laptop:justify-end gap-6 my-6" id="paginacionTabla">
                    <Pagination changePage={changePageBreaches} nPages={nPagesBreaches} currentPage={currentPageBreaches} indexStart={indexStartBreaches} indexEnd={indexEndBreaches} />
                </div>




            </main>

        </div>
    )
}

export default ContractDetail