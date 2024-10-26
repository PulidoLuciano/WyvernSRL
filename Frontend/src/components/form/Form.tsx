import { FormProps } from '../../interfaces/FormInterfaces'

const Form = ({ children, handleSubmit, className} : FormProps) => {

  return (
        <form onSubmit={ handleSubmit } action="" className={className} >
            {children}      
        </form>
  )
}

export default Form