import { useState } from 'react'
import AccordionProps from '../interfaces/AccordionInterfaces';
import filterIcon from "../images/filterIcon.svg"

const Accordion = ({ title, createForm }: AccordionProps) => {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const handleClick = () => {
        setAccordionOpen(!accordionOpen)
    }

    const handleCreateSubmit = () =>{}
    const handleFilterSubmit = () =>{}

    return (
        <div className='py-6'>
            <button onClick={handleClick} className='flex justify-between items-center w-full mb-6'>
                <h2 className='font-bold text-xl'>{title}</h2>
                {accordionOpen ? <svg data-accordion-icon className="me-6 w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                </svg> : <svg data-accordion-icon className="me-6 w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                </svg>}

            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out  ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <form onSubmit={createForm? handleCreateSubmit : handleFilterSubmit } action="" className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-64' >
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

                        <label className="inline-flex items-center justify-between cursor-pointer">
                            <span className="ms-3 me-3 text-gray-900">Suscripto</span>
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray2 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>

                        </label>

                        <div className='flex flex-col'>
                            <label htmlFor="paises">País</label>
                            <select id='paises' className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'>
                                <option value="Argentina">Argentina</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="España">España</option>
                                <option value="Rusia">Rusia</option>
                            </select>
                        </div>

                        {createForm ? <button type='submit' className='text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'>
                            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
                            </svg>
                                Guardar
                            </button> :

                            <button type='submit' className='text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'>
                                <img src={filterIcon} alt="filterIcon" />
                                Filtrar
                            </button>
                        }

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Accordion