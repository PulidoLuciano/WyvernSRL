import {TableProps} from '../../utils/types/TableInterfaces'

const Table = ({children,headers,id} : TableProps) => {
 
   
 
  return (
    <table className='w-full' id={id}>
        <thead>
            <tr>

            
            {headers.map((head,index) => {
                    return <th key={index} className='p-2 text-start '>{head}</th>
            })}
            <th className='p-2 text-start '></th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
        
    </table>
  )
}

export default Table