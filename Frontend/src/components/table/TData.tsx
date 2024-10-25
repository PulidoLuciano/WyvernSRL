import { useState } from 'react'
import { TDataProps } from '../../interfaces/TableInterfaces'

const TData = ({children,checkbox,selectedAll,onChange}: TDataProps) => {

  if(checkbox){
    return <td className=' p-2 '><input type="checkbox" defaultChecked={selectedAll} onChange={onChange} className="me-2"  />{children}</td>
  }else{
    return ( <td className=' p-2 '>{children}</td>)
  }
}

export default TData