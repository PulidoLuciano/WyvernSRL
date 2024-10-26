import {TableProps} from '../../interfaces/TableInterfaces'

const Table = ({onChange,children,headers} : TableProps) => {
 
   
 
  return (
    <table className='w-full' id='clientsTable'>
        <thead>
            <tr>

            
            {headers.map(head => {
                if(head.checkbox){
                    return <th className='p-2 text-start '><input type="checkbox" onChange={onChange} className="me-2 tableCheckbox"  />
                    {head.title}
                    </th>
                }
                else
                {
                    return <th className='p-2 text-start '>{head.title}</th>
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