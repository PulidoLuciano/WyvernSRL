
import { TDataProps } from '../../utils/types/TableInterfaces'

const TData = ({ id, children, checkbox, onChange }: TDataProps) => {

  if (checkbox) {
    return <td className=' p-2 '><input type="checkbox" id={id} onChange={onChange} className="me-2" />{children}</td>
  } else {
    return (<td className=' p-2 '>{children}</td>)
  }
}

export default TData