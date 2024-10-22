import Accordion from "../components/Accordion"
import Pagination from "../components/Pagination"
import { useState } from "react";

const ClientData = () => {

    const [selectedAll, setSelectedAll] = useState<boolean>(false);
    const [juegosQt, setJuegosQt] = useState<number>(10);
    const [currentPageJuegos, setCurrentPageJuegos] = useState<number>(1)
    const [editable, setEditable] = useState(false);


    const juegos = [
        {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        }, {
            product: "juego1",
            idSale: 1,
            date: "2024-09-30 14:30:14",

        },
    ]

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
    const nPages = Math.ceil(juegos.length / juegosQt);
    const dataShown = juegos.slice(indexStart, indexEnd);

    const changePage = (nextPage: number) => {
        setCurrentPageJuegos(nextPage);
    }

    const handleClickEditable = () => {
        setEditable(!editable);
    }

    const handleCheckAll = () => {
        setSelectedAll(!selectedAll)
    }

    return (
        <main className=' w-full p-3 tablet:p-12 '>
            <h1 className='text-2xl'>Visualización cliente: {client.id}</h1>

            {editable ?
                <>
                    <div className="my-6">
                        <form className="grid grid-rows-6 grid-cols-1 gap-y-6">
                            <div className='flex items-start gap-x-2 mt-12 tablet:gap-6'>
                                <h2 className="text-xl" >Datos del cliente</h2>
                                <button onClick={handleClickEditable} className="bg-green flex font-semibold text-black rounded px-6 py-2">
                                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
                                    </svg>
                                    Guardar
                                </button>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="nombreCliente">Nombre</label>
                                <input className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5' type="text" id='nombreCliente' placeholder='Username' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="correo">Correo</label>
                                <input className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5' type="text" id='correo' placeholder='Username@user.com' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="telefono">Teléfono</label>
                                <input className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5' type="number" name="telefono" id="telefono" placeholder='5493816341612' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="plataformas">Plataforma</label>
                                <select id='plataformas' className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'>
                                    <option value="Steam">Steam</option>
                                    <option value="Epic Games">Epic Games</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="paises">País</label>
                                <select id='paises' className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="España">España</option>
                                    <option value="Rusia">Rusia</option>
                                </select>
                            </div>

                            <label className="inline-flex items-center justify-between cursor-pointer">
                                <span className="ms-3 me-3 text-gray-900">Suscripto</span>
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray2 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>

                            </label>


                        </form>
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
                    <p>Total de compras:{juegos.length}</p>
                </div>

                <button className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                    Eliminar Seleccionados (0)
                </button>
            </div>

            <div className='overflow-x-auto mt-6'>
                <table className='w-full'>
                    <thead className=''>
                        <th className='p-2 flex text-start '><input type="checkbox" onChange={handleCheckAll} className='me-2' />Producto</th>
                        <th className='p-2 text-start '>ID Venta</th>
                        <th className='p-2 text-start '>Fecha</th>
                        <th className='p-2 text-start '></th>
                    </thead>
                    <tbody className=''>
                        {dataShown.map(juego => {
                            return (<>
                                <tr>
                                    <td className=' p-2 '><input type="checkbox" checked={selectedAll} className='me-2' />{juego.product}</td>
                                    <td className=' p-2 '>{juego.idSale}</td>
                                    <td className=' p-2'>{juego.date}</td>
                                    <td className='flex justify-center items-center gap-2 p-2 '>
                                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>

                                    </td>
                                </tr>
                            </>)
                        })}
                    </tbody>
                </table>
            </div>


            <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>

                <Pagination changePage={changePage} nPages={nPages} currentPage={currentPageJuegos} indexStart={indexStart} indexEnd={indexEnd} />

            </div>

        </main>
    )
}

export default ClientData