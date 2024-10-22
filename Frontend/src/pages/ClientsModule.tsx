import { useState } from 'react'
import filterIcon from "../images/filterIcon.svg"
import Accordion from '../components/Accordion'
import Pagination from '../components/Pagination';
import Nav from '../components/Nav'


const ClientsModule = () => {

  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const data = [
    {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    },
    {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }, {
      name: "jesus",
      phone: "123123",
      email: "jesus@gmail.com",
      suscription: true,
      pais: "argentina"
    }
  ]

  //PAGINATION

  const indexEnd = currentPage * dataLength;
  const indexStart = indexEnd - dataLength;
  const nPages = Math.ceil(data.length / dataLength);
  const dataShown = data.slice(indexStart, indexEnd);
  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  }


  //********

  const handleCheckAll = () => {
    setSelectedAll(!selectedAll)
  }


  const handleCheck = () => {

  }

  return (
    <main className='w-full flex'>
      <div>
        <Nav/>
      </div>
      <div className='px-10 py-5'>
        <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
          <h1 className='text-4xl'>Modulo Clientes</h1>
          <p>Ver, crear, editar y eliminar clientes</p>
        </div>

        <Accordion title="Filtrar por">
          <form action="" className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-64' >
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

            <button type='submit' className='text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'>
              <img src={filterIcon} alt="filterIcon" />
              Filtrar
            </button>

          </form>
        </Accordion>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6'>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Clientes</h2>
            <p>Página 1 de 20</p>
          </div>

          <button className='bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6'>
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
            Eliminar Seleccionados (0)
          </button>

          <button className='bg-primary font-semibold laptopL:col-start-6 laptopL:col-end-7 rounded flex gap-2 items-center justify-center text-white'>
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            Enviar Noticia
          </button>
        </div>

        <div className='overflow-x-auto mt-6'>
          <table className='w-full'>
            <thead className=''>
              <th className='p-2 flex text-start '><input type="checkbox" onChange={handleCheckAll} className='me-2' />Nombre</th>
              <th className='p-2 text-start '>Plataforma</th>
              <th className='p-2 text-start '>País</th>
              <th className='p-2 text-start '>Suscripto</th>
              <th className='p-2 text-start '>Correo</th>
              <th className='p-2 text-start '></th>
            </thead>
            <tbody className=''>
              {dataShown.map(cliente => {
                return (<>
                  <tr>
                    <td className=' p-2 '><input type="checkbox" className='me-2' />{cliente.name}</td>
                    <td className=' p-2 '>steam</td>
                    <td className=' p-2 '>{cliente.pais}</td>
                    <td className=' p-2 '>{cliente.suscription ? "Si" : "No"}</td>
                    <td className=' p-2 '>{cliente.email}</td>
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

          <Pagination changePage={changePage} nPages={nPages} currentPage={currentPage} indexStart={indexStart} indexEnd={indexEnd} />

        </div>
      </div>
      
    </main>
  )
}

export default ClientsModule