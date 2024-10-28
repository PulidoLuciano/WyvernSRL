import { SelectProps }  from '../../utils/types/FormInterfaces'


const Select = ({ id, name, title, options, onChange } : SelectProps) => {
  
  return (
    <div className='flex flex-col'>
        <label htmlFor={id}>{title}</label>
        <select id={id} name={name} defaultValue={options[0].id} onChange={onChange} className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'>    
                {options.map((option,index)=>(
                    <option key={index} value={option.id}>{option.nombre}</option>
                )
            )
            }
        </select>
    </div>
  )
}

export default Select