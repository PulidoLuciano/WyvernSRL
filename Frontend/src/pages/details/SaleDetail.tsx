import { useState, useEffect } from 'react'
import Nav from '../../components/Nav'
import { useGeneral } from '../../hooks/useGeneral'
import useSales from '../../hooks/useSales'
import { useParams } from 'react-router-dom'
import { CreateSaleErrors } from '../../utils/types/saleType'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import Form from '../../components/form/Form'
import SaveButton from '../../components/form/SaveButton'
import { useClients } from '../../hooks/useClients'
import { saleSchema } from '../../schemas/salesSchema'
import { saleType } from '../../utils/types/saleType'
import * as Yup from 'yup'
import { useProducts } from '../../hooks/useProducts'


const SaleDetail = () => {

    const { products, getAllProducts } = useProducts()
    const {clients,getAllClients} = useClients();
    const {loading, error, saleDetail, getSale,updateSale } = useSales()
    const params = useParams();
    const saleId = parseInt(params.saleId || "", 10);
    const [editable, setEditable] = useState(false);
    const [createErrors, setCreateErrors] = useState<CreateSaleErrors>({});
    const [editedData, setEditedData] = useState({
        client: '',
        product: '',
        date: '',
    });

    useEffect(() => {
        getAllProducts();
        getSale(saleId,true,true);
        getAllClients();
    }, [])

    useEffect(() => {
        if (saleDetail) {
            setEditedData({
                client: saleDetail.Clientes?.nombre,
                product: saleDetail.Productos?.id,
                date: saleDetail.fecha,
            })
        }
        console.log(saleDetail);

    }, [saleDetail])

    const handleClickEditable = () => {
        setEditable(!editable);
      };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
    
    
          const clientExist = clients.find(c => c.nombre == editedData.client);
          
    
          if (clientExist == undefined) {
            setCreateErrors({ ...createErrors, client: "Este cliente no existe" })
            throw new Error("Este cliente no existe")
          }
    
    
          await saleSchema.validate(editedData, { abortEarly: false });
          const data: saleType = {
            client: clientExist.id,
            date: editedData.date,
            product: editedData.product
          }
          updateSale(saleId,data)
          setCreateErrors({});
          handleClickEditable()
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

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedData({
          ...editedData,
          [name]: value
        });
      }

    if (loading) return <p>Cargando detalles de la venta...</p>;

    return (
        <div className='w-full flex'>

            <Nav />

            <main className='m-0 laptop:ms-72 p-8 w-full'>

                {saleDetail ? (
                    <h1 className="text-2xl">
                        Visualización venta: {saleDetail.id}
                    </h1>
                ) : (
                    <h1 className="text-2xl">Visualización venta: ?</h1>
                )}
                {editable ? (
                    <>
                        <div className="my-6">
                            <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                                <>
                                    <Input error={createErrors.client} id={"nombreUsuario"} name={"client"} value={editedData.client} title={"Nombre de Usuario"} type={"text"} placeholder={"Marcos_1490"} onChange={handleEditChange} ></Input>
                                    <Select selected={saleDetail.Productos?.id} error={createErrors.product} id={"productos"} title={"Productos"} name={"product"} options={products} onChange={handleEditChange}></Select>
                                    <Input error={createErrors.date} id={"fecha"} name={"date"} value={editedData.date} title={"Fecha"} type={"text"} placeholder={"2023-07-17"} onChange={handleEditChange} ></Input>
                                    <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
                                </>
                            </Form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 my-6">
                            <div className="col-span-2 flex gap-x-3 mb-4">
                                <h2 className="text-xl">Datos de la venta</h2>
                                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                    Editar
                                </button>
                            </div>
                            {saleDetail ? (
                                <>
                                    <h4 className="font-semibold text-lg">Cliente</h4>
                                    <p>{saleDetail.Clientes?.nombre}</p>
                                    <h4 className="font-semibold text-lg">Producto</h4>
                                    <p className="underline decoration-1">
                                        {saleDetail.Productos?.nombre}
                                    </p>
                                    <h4 className="font-semibold text-lg">Fecha</h4>
                                    <p>{saleDetail.fecha}</p>
                                </>
                            ) : (
                                <>
                                    <p>Venta no encontrada</p>
                                    <p>{error}</p>;
                                </>
                            )}
                        </div>
                    </>
                )}


            </main>


        </div>
    )
}

export default SaleDetail