
import { InputProps }  from '../../utils/types/FormInterfaces.ts'

const Input = ( { id,name,value,title,type,placeholder, onChange } : InputProps) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={id}>{title}</label>
        <input className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5' 
        name={name} value={value} type={type} id={id} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default Input