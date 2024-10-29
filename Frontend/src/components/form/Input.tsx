
import { InputProps } from '../../utils/types/FormInterfaces.ts'


const Input = ({ id, name, value, title, type, placeholder, onChange, error }: InputProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='flex gap-2 ' >{title}  </label>
        <input name={name} className='bg-gray border border-gray2 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5'
          value={value} type={type} id={id} placeholder={placeholder} onChange={onChange} />
      {error && <div className='flex gap-3 mt-2'>
        <svg className="w-6 h-6 text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p className='text-red'>{error}</p>
      </div>}
    </div>
  )
}

export default Input