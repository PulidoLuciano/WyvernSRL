import { useState } from 'react'

import Accordion from '../components/Accordion'
import Pagination from '../components/Pagination';



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
    <main className=' w-full p-3 tablet:p-12 '>

      <div className='flex flex-col items-start gap-y-3 tablet:gap-6'>
        <h1 className='text-4xl'>Modulo Clientes</h1>
        <p>Ver, crear, editar y eliminar clientes</p>
      </div>

      <Accordion title="Crear Nuevo" createForm={true}/>
      <Accordion title="Filtrar por" createForm={false}/>


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

    </main>
  )
}

export default ClientsModule