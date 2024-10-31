import Pagination from "../components/Pagination"
import { useState, useEffect } from "react";
import { compras } from '../utils/dataArrays'
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Checkbox from '../components/form/Checkbox';
import Select from '../components/form/Select';
import Nav from "../components/Nav";
import SaveButton from "../components/form/SaveButton";
import Table from "../components/table/Table";
import TRow from "../components/table/TRow";
import TData from "../components/table/TData";
import { useGeneral } from "../hooks/useGeneral";

const ClientData = () => {

    const { countries, platforms, getAllCountries, getAllPlatforms } = useGeneral()
    const [selectedAll, setSelectedAll] = useState<boolean>(false);
    const [juegosQt, setJuegosQt] = useState<number>(10);
    const [currentPageJuegos, setCurrentPageJuegos] = useState<number>(1)
    const [editable, setEditable] = useState(false);
    const [editedData, setEditedData] = useState({
        name: '',
        phone: '',
        email: '',
        platform: '',
        suscription: '',
        country: ''
    });

    useEffect(() => {
        getAllCountries();
        getAllPlatforms();
    }, [getAllCountries, getAllPlatforms])

    const client = {
        id: 1,
        name: "jesus",
        phone: "123123",
        email: "jesus@gmail.com",
        suscription: true,
        pais: "argentina",
        platform: "Steam"
    }

    const indexEnd = currentPageJuegos * juegosQt;
    const indexStart = indexEnd - juegosQt;
    const nPages = Math.ceil(compras.length / juegosQt);
    const dataShown = compras.slice(indexStart, indexEnd);

    const changePage = (nextPage: number) => {
        setCurrentPageJuegos(nextPage);
    }

    const handleClickEditable = () => {
        setEditable(!editable);
    }

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(editedData);

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });

    }

    const clientTableHeaders: Array<string> = [
        "Producto",
        "ID Venta",
        "Fecha"
    ]

    return (
        <div className='w-full flex '>
            <Nav />
            <main className='ms-72 p-8'>
                <h1 className='text-2xl'>Visualización cliente: {client.id}</h1>

                {editable ?
                    <>
                        <div className="my-6">
                            <Form handleSubmit={handleSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                                <>
                                    <Input id={"nombreCliente"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleChange} error=''></Input>
                                    <Input id={"correo"} name={"email"} value={editedData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleChange} error=''></Input>
                                    <Input id={"telefono"} name={"phone"} value={editedData.phone} title={"Teléfono"} type={"number"} placeholder={"5493816341612"} onChange={handleChange} error=''></Input>
                                    <Select id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleChange}></Select>
                                    <Checkbox title={"Suscripto"} name={"suscription"} onChange={handleChange}></Checkbox>
                                    <Select id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleChange}></Select>
                                    <SaveButton className={'text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'} />
                                </>
                            </Form>
                        </div>

                    </> :
                    <>
                        <div className="grid grid-cols-2 my-6">
                            <div className="col-span-2 flex gap-x-3 mb-4">
                                <h2 className="text-xl" >Datos del cliente</h2>
                                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                    Editar
                                </button>

                            </div>
                            <h4 className="font-semibold text-lg">Nombre</h4>
                            <p>{client.name}</p>
                            <h4 className="font-semibold text-lg">Correo</h4>
                            <p className="underline decoration-1">{client.email}</p>
                            <h4 className="font-semibold text-lg">Teléfono</h4>
                            <p>{client.phone}</p>
                            <h4 className="font-semibold text-lg">Plataforma</h4>
                            <p>{client.platform}</p>
                            <h4 className="font-semibold text-lg">País</h4>
                            <p>{client.pais}</p>
                            <h4 className="font-semibold text-lg">Suscripto</h4>
                            <p>{client.suscription ? "Sí" : "No"}</p>
                        </div>
                    </>}


                <div className='grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
                    <div className='flex flex-col gap-2 items-start tablet:col-span-2'>
                        <h2 className="text-3xl">Compras del cliente</h2>
                        <p>Total de compras:{compras.length}</p>
                    </div>

                    <button className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        Eliminar Seleccionados (0)
                    </button>
                </div>

                <div className='overflow-x-auto mt-6'>
                    <Table headers={clientTableHeaders}>
                        {
                            dataShown.map((compras, index) => {
                                return (
                                    <TRow key={index} id={compras.idSale}>
                                        <TData selectedAll={selectedAll} checkbox={true}>{compras.product}</TData>
                                        <TData>{compras.idSale}</TData>
                                        <TData>{compras.date}</TData>
                                    </TRow>)
                            })
                        }
                    </Table>

                </div>

                <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

                    <Pagination changePage={changePage} nPages={nPages} currentPage={currentPageJuegos} indexStart={indexStart} indexEnd={indexEnd} />

                </div>
            </main>

        </div>
    )
}

export default ClientData