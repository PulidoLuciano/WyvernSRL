
export default interface paginationProps {
    changePage : (nextPage : number) => void,
    currentPage : number,
    indexStart : number,
    indexEnd : number,
    nPages : number
}