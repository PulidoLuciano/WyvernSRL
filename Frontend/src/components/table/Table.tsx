import React, { Children } from 'react'
import {TableProps} from '../../interfaces/TableInterfaces'

const Table = ({children,headers} : TableProps) => {
  return (
    <table className='w-full'>
        <thead>
            {headers.map(head => {
                if(head.checkbox){
                    return <th className='p-2 flex text-start '><input type="checkbox" onChange={head.onChange} className='me-2' />{head.title}</th>
                }
                else
                {
                    return <th className='p-2 flex text-start '>{head.title}</th>
                }
            })}
        </thead>
        <tbody>
            {children}
        </tbody>
        
    </table>
  )
}

export default Table