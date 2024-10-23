import { FormProps } from '../../interfaces/FormInterfaces'

const Form = ({ children, handleSubmit} : FormProps) => {

  return (
        <form onSubmit={ handleSubmit } action="" className='grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32' >
            {children}      
        </form>
  )
}

export default Form