import { SelectProps } from '../../utils/types/FormInterfaces'


const Select = ({ id, name, title, options,error, onChange }: SelectProps) => {

 
  return (
    <div className='flex flex-col'>
      <label htmlFor={id}>{title}</label>
      <select id={id} name={name} onChange={onChange} className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'>
        <option></option>
        {options.map((option, index) => (<option key={index} value={option.id}>{option.nombre}</option>))}
      </select>
      {error && <div className='flex gap-3 mt-2'>
        <svg className="w-6 h-6 text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p className='text-red'>{error}</p>
      </div>}
    </div>
  )
}

export default Select