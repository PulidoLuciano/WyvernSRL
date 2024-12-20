import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import SaveButton from "../../components/form/SaveButton";
import Accordion from "../../components/Accordion";
import { CreateMarketsErrors, marketType } from "../../utils/types/suppliersType";
import { marketSchema } from "../../schemas/suppliersSchema";
import * as Yup from "yup";
import { useMarkets } from "../../hooks/useMarkets";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Swal from "sweetalert2";

const MarketDetail = () => {

    const params = useParams();
    const marketId = parseInt(params.marketId || "", 10);

    const { getMarket, updateMarket, marketDetail, loading, error } = useMarkets()
    const { role } = useAuth()

    useEffect(() =>{
        getMarket(marketId)
    },[])

    useEffect(() => {
        if (marketDetail) {
          setEditedData({
            name: marketDetail.nombre,
          })
        }
        
      }, [marketDetail])

    const [createErrors, setCreateErrors] = useState<CreateMarketsErrors>({});
    const [editable, setEditable] = useState(false);
  
    const [editedData, setEditedData] = useState<marketType>({
      name: ''
    });
  
    const handleClickEditable = () => {
        setEditable(!editable);
      };
    
      const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.children;

        if (role == 'Auditor') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No tiene autorizacion para esta accion",
          });
          return
        }

        try {
          await marketSchema.validate(editedData, { abortEarly: false });
          
          updateMarket(marketId, editedData);
          setCreateErrors({});
          handleClickEditable()
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const createErrors: CreateMarketsErrors = {};
            err.inner.forEach((error) => {
              if (error.path)
                createErrors[error.path as keyof CreateMarketsErrors] =
                  error.message;
            });
    
            setCreateErrors(createErrors);
            console.log(createErrors);
            
          }
        }
      };
      
      const handleEditChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setEditedData({
          ...editedData,
          [name]: value
        });
      };

  if (loading) return <p>Cargando detalles del rubro...</p>;

  return (
 
      
      <main className="w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative">
      {marketDetail ? (
          <h1 className="text-2xl">
            Visualizacion Area: {marketDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Area: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"name"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} onChange={handleEditChange} error={createErrors.name}></Input>
                  <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"}/>
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del area</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {marketDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Id</h4>
                  <p>{marketDetail.id}</p>
                  <h4 className="font-semibold text-lg">nombre</h4>
                  <p>{marketDetail.nombre}</p>
                </>
              ) : (
                <>
                  <p>Area no encontrada</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}
      </main>
    
  );
};

export default MarketDetail;
