import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import Nav from "../../components/Nav";
import Pagination from "../../components/Pagination";
import SaveButton from "../../components/form/SaveButton";
import Table from "../../components/table/Table";
import TRow from "../../components/table/TRow";
import TData from "../../components/table/TData";
import Input from "../../components/form/Input";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { employeeTableHeaders } from "../../utils/dataArrays";
import { CreatePositionErrors, positionType } from "../../utils/types/positionType";
import { usePositions } from "../../hooks/usePositions";
import { positionSchema } from "../../schemas/positionSchema";
import { useEmployees } from "../../hooks/useEmployees";

const PositionDetail = () => {
  const params = useParams();
  const areaId = parseInt(params.areaId || "", 10);
  const positionId = parseInt(params.positionId || "", 10);
  
  const { positionDetail , getPosition, updatePosition, loading, error, getPositionEmployees, positionEmployees} = usePositions();
  const { deleteEmployee } = useEmployees();
  
  useEffect(() => {
    getPosition(positionId)
    getPositionEmployees(positionId)
  }, []);

  useEffect(() => {
    if (positionDetail) {
      setEditedData({
        name: positionDetail.nombre
      })
    }
  }, [positionDetail])
  
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPagePositionEmployees, setCurrentPagePositionEmployees] = useState<number>(1);
  const [createErrors, setCreateErrors] = useState<CreatePositionErrors>({});
  const [editable, setEditable] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const [editedData, setEditedData] = useState<positionType>({
    name: ''
  });

  const indexEndPositionEmployees= currentPagePositionEmployees * dataLength;
  const indexStartPositionEmployees = indexEndPositionEmployees - dataLength;
  const nPagesPositionEmployees = Math.ceil(positionEmployees.length / dataLength);
  const dataShownPositionEmployees = positionEmployees.slice(indexStartPositionEmployees, indexEndPositionEmployees);

  const changePagePositionEmployees= (nextPage: number) => {
    setCurrentPagePositionEmployees(nextPage);
  };

  const handleClickEditable = () => {
    setEditable(!editable);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await positionSchema.validate(editedData, { abortEarly: false });
      
      updatePosition(positionId, areaId, editedData);
      setCreateErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: CreatePositionErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof CreatePositionErrors] =
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

  if (loading) return <p>Cargando detalles del puesto...</p>;

  return (
    <div className="w-full flex ">
      <Nav />
      <main className="ms-72 p-8">
        {positionDetail ? (
          <h1 className="text-2xl">
            Visualizacion Puesto: {positionDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Puesto: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"name"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} onChange={handleEditChange} error={createErrors.name}></Input>
                  <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-span-3 tablet:place-self-center"}/>
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6 w-1/2">
              <div className="col-span-2 flex gap-x-3 mb-7">
                <h2 className="text-xl">Datos del puesto</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {positionDetail ? (
                <>
                    <h4 className="font-semibold text-lg">Id</h4>
                    <p>{positionDetail.id}</p>
                    <h4 className="font-semibold text-lg">Nombre</h4>
                    <p>{positionDetail.nombre}</p>
                </>
              ) : (
                <>
                  <p>Puesto no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
              <h2 className="text-3xl">Empleados con este puesto</h2>
              <p>Total de empleados: {positionEmployees.length}</p>
          </div>
        </div>    
        
        <div className="overflow-x-auto mt-6">
          <Table headers={employeeTableHeaders}>
            {
            dataShownPositionEmployees.length != 0 ?
            dataShownPositionEmployees.map((empleado, index) => (
              <TRow key={index} id={empleado.id} deleteButton={false} detail={false} >
                <TData checkbox={true} id={empleado.id}>{empleado.id}</TData>
                <TData>{empleado.correo ? empleado.correo : "-"}</TData>
                <TData>{empleado.dni ? empleado.dni : "-"}</TData>
                <TData>{empleado.sueldo ? `$${empleado.sueldo}` : "-"}</TData>
                <TData>{empleado.Provincias?.nombre }</TData>
              </TRow>
            )):
            <div className=''>No hay empleados</div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePagePositionEmployees} nPages={nPagesPositionEmployees} currentPage={currentPagePositionEmployees} indexStart={indexStartPositionEmployees}indexEnd={indexEndPositionEmployees}/>
        </div>

      </main>
    </div>
  );
};

export default PositionDetail;
