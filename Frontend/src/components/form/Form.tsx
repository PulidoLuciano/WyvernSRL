import { FormProps } from '../../utils/types/FormInterfaces'

const Form = ({ children, handleSubmit, className} : FormProps) => {

  return (
        <form onSubmit={ handleSubmit } action="" className={className} >
            {children}      
        </form>
  )
}

export default Form