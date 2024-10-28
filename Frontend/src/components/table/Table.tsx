import {TableProps} from '../../utils/types/TableInterfaces'

const Table = ({onChange,children,headers} : TableProps) => {
 
   
 
  return (
    <table className='w-full' id='clientsTable'>
        <thead>
            <tr>

            
            {headers.map((head,index) => {
                if(head.checkbox){
                    return <th key={index} className='p-2 text-start '><input type="checkbox" onChange={onChange} className="me-2 tableCheckbox"  />
                    {head.title}
                    </th>
                }
                else
                {
                    return <th key={index} className='p-2 text-start '>{head.title}</th>
                }
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