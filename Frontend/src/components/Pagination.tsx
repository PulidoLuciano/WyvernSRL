import paginationProps from '../utils/types/PaginationInterface'

const Pagination = ({changePage,currentPage,indexEnd,indexStart,nPages} : paginationProps) => {
  

    const selectedPage = (page:number) =>{
        changePage(page);
    }

    const next  = ()=>{
        if(currentPage !== nPages ) changePage(currentPage + 1)
    }

    const prev = () =>{
        if(currentPage !== 1) changePage(currentPage - 1)
    }

    let items = [];

    for (indexStart; indexStart <= indexEnd; indexStart++) {
        items.push(<button onClick={()=>{selectedPage(indexStart)}} className={`${currentPage == indexStart ? "bg-primary rounded-md p-2 ": ""}`} >{indexStart}</button>);
    }
    return (
    <>
        <button onClick={prev} disabled={currentPage==1}>
          <svg className={`w-6 h-6 text-black ${currentPage==1 ? "text-gray2":""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
          </svg>

        </button>
        {
          Array.from({ length: nPages }, (_, i) => i).map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-md transition-all duration-300 ease-in-out ${currentPage==page+1 ? "bg-primary text-white": ""}`}
              onClick={() => selectedPage(page + 1)}
            >
              {page + 1}
            </button>
          ))
        }
        <button onClick={next} disabled={currentPage==nPages}>
          <svg className={`w-6 h-6 text-black ${currentPage==nPages ? "text-gray2":""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>

        </button>
        
    </>
  )
}

export default Pagination