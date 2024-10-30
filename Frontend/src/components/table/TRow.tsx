import { useEffect } from 'react';
import { useClients } from '../../hooks/useClients'
import { TRowProps } from '../../utils/types/TableInterfaces'

const TRow = ({ children, id }: TRowProps) => {

  const { deleteClient, getAllClients } = useClients();

  const handleDelete = () => {
    deleteClient([id])
  }

 
  return (
    <tr>
      {children}
      <td className='flex justify-center items-center gap-2 p-2 '>
        <svg  className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
          <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <button onClick={handleDelete}>
          <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
          </svg>
        </button>
      
      </td>
    </tr>
  )
}

export default TRow