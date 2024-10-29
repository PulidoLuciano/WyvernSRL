import { useState } from 'react'
import AccordionProps from '../utils/types/AccordionInterfaces';

const Accordion = ({ title , children } : AccordionProps  ) => {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const handleClick = () => {
        setAccordionOpen(!accordionOpen)
    }


    return (
        <div className='py-6'>
            <button onClick={handleClick} className='flex justify-between items-center w-full mb-6'>
                <h2 className='font-bold text-xl'>{title}</h2>
                {accordionOpen ? <svg data-accordion-icon className="me-6 w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg> : <svg data-accordion-icon className="me-6 w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>}

            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out  ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Accordion