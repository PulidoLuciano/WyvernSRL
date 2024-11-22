import { CheckboxProps }  from '../../utils/types/FormInterfaces'

const Checkbox = ({title, name, onChange} : CheckboxProps) => {
    return (
    <div className='flex flex-col justify-center'>
    <label className="inline-flex items-center justify-between cursor-pointer">
        <span className="ms-3 me-3 text-gray-900">{title}</span>
        <input type="checkbox" name={name} onChange={onChange} className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
    </label>
    </div>
  )
}

export default Checkbox