
import Nav from '../components/Nav'
import wyvernLogo from '../images/WyvernLogo.jpg'

const Home = () => {

  // className='ms-80 my-56 w-4/6 flex flex-col items-center justify-center'
  return (
    <>
    
    <main className='w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative flex justify-center'>
      
      <div className='w-4/6 flex flex-col items-center justify-center'>
        <h1 className=' text-xl laptop:text-6xl m-10 h-'>Bienvenido a</h1>  
        <img className='w-[200px] tablet:w-[500px]' src={wyvernLogo} alt="" />     
      </div>    

      
    </main>
    </>
  )
}

export default Home