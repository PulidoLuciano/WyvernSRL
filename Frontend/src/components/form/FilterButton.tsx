import filterIcon from '../../images/filterIcon.svg'
import { ButtonProps } from '../../utils/types/FormInterfaces'

const FilterButton = ({className}: ButtonProps) => {
  return (
    <button type='submit' className={className}>
        <img src={filterIcon} alt="filterIcon" />
        Filtrar
    </button>
  )
}

export default FilterButton