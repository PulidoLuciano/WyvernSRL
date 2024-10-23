import filterIcon from '../../images/filterIcon.svg'

const FilterButton = () => {
  return (
    <button type='submit' className='text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end'>
        <img src={filterIcon} alt="filterIcon" />
        Filtrar
    </button>
  )
}

export default FilterButton