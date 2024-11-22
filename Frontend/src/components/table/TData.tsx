import { useState } from 'react'
import { TDataProps } from '../../utils/types/TableInterfaces'

const TData = ({ id, selectedData,children,value, checkbox, onChange }: TDataProps) => {

  let isChecked

  if(id){
    isChecked = selectedData?.includes(String(id));
  }

  if (checkbox) {
    return <td className=' p-2 '><input type="checkbox" checked={isChecked} id={id} value={value} onChange={onChange} className="me-2" />{children}</td>
  } else {
    return (<td className=' p-2 '>{children}</td>)
  }
}

export default TData