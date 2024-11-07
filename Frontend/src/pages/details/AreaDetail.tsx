import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import Accordion from "../../components/Accordion";
import Pagination from "../../components/Pagination";
import Table from "../../components/table/Table";
import TRow from "../../components/table/TRow";
import TData from "../../components/table/TData";
import Input from "../../components/form/Input";
import Nav from "../../components/Nav";
import SaveButton from "../../components/form/SaveButton";
import { useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { areaSchema } from "../../schemas/areaSchema";
import { areaType, CreateAreaErrors } from "../../utils/types/areaType";
import { useAreas } from "../../hooks/useAreas";
import { employeeTableHeaders, positionsTableHeaders } from "../../utils/dataArrays";
import { usePositions } from "../../hooks/usePositions";
import { CreatePositionErrors, positionType } from "../../utils/types/positionType";
import { positionSchema } from "../../schemas/positionSchema";
import { employeeType } from "../../utils/types/employeeType";

const AreaDetail = () => {
  const params = useParams();
  const { pathname } = useLocation()
  const areaId = parseInt(params.areaId || "", 10);

  const path = pathname.slice(1)
  
  const { areaDetail , getArea, getAreaEmployees, areaEmployees, updateArea, loading, error } = useAreas();
  const {getPositions, positions, deletePosition, createPosition} = usePositions()
  
  useEffect(() => {
    getArea(areaId)
    getPositions(areaId)
    getAreaEmployees(areaId)
  }, []);
  
  
  useEffect(() => {
    if (areaDetail) {
      setEditedData({
        name: areaDetail.nombre,
      })
    }
    
  }, [areaDetail])

  
  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPagePositions, setCurrentPagePositions] = useState<number>(1);
  const [currentPageEmployees, setCurrentPageEmployees] = useState<number>(1);
  const [createErrors, setCreateErrors] = useState<CreateAreaErrors>({});
  const [editable, setEditable] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<Array<string>>([]);

  const [editedData, setEditedData] = useState<areaType>({
    name: ''
  });

  const [position, setPosition] = useState<positionType>({
    name: '',
  });

  const [employees, setEmployees] = useState<employeeType>({
    name: '',
    phone: '',
    email: '',
    dni: null,
    hiringDate: null,
    salary: null,
    country: null,
    state: null,
    position: null
  });

  const indexEndPositions= currentPagePositions * dataLength;
  const indexStartPositions = indexEndPositions - dataLength;
  const nPagesPositions = Math.ceil(positions.length / dataLength);
  const dataShownPositions = positions.slice(indexStartPositions, indexEndPositions);

  const indexEndEmployees = currentPageEmployees * dataLength;
  const indexStartEmployees = indexEndEmployees - dataLength;
  const nPagesEmployees = Math.ceil(areaEmployees.length / dataLength);
  const dataShownEmployees = areaEmployees.slice(indexStartEmployees, indexEndEmployees);

  const changePagePositions= (nextPage: number) => {
    setCurrentPagePositions(nextPage);
  };

  const changePageEmployees= (nextPage: number) => {
    setCurrentPagePositions(nextPage);
  };

  const handleClickEditable = () => {
    setEditable(!editable);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await areaSchema.validate(editedData, { abortEarly: false });
      
      updateArea(areaId, editedData);
      setCreateErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: CreateAreaErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof CreateAreaErrors] =
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

  const handlePositionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await positionSchema.validate(position, { abortEarly: false });
      createPosition(areaId, position);
      setCreateErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: CreatePositionErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof CreatePositionErrors] =
              error.message;
        });
        console.log(createErrors);
        
        setCreateErrors(createErrors);
      }
    }
  };

  const handlePositionChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setPosition({
      ...position,
      [name]: value,
    });
  };

  const handleSelectedPositions = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    const dataExist = selectedPositions.find((d) => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedPositions.filter((d) => d != dataExist);
      setSelectedPositions(newSelectedData);
    } else {
      setSelectedPositions([...selectedPositions, e.target.id]);
    }
  };

  const handleDeleteSelectedPositions = async (selectedDataContact: Array<string>) => {
    if (!selectedDataContact || selectedDataContact.length == 0) {
      return;
    } else {
      const dataDelete = await deletePosition(areaId, selectedDataContact);
      if (dataDelete) console.log("contactos eliminados exitosamente");
      setSelectedPositions([]);
    }
  };


  if (loading) return <p>Cargando detalles del area...</p>;

  return (
    <div className="w-full flex ">
      <Nav />
      <main className="ms-72 p-8">
        {areaDetail ? (
          <h1 className="text-2xl">
            Visualizacion Area: {areaDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Area: ?</h1>
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
              <div className="col-span-2 flex gap-x-2 mb-7">
                <h2 className="text-xl">Datos del area</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {areaDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Id</h4>
                  <p>{areaDetail.id}</p>
                  <h4 className="font-semibold text-lg">nombre</h4>
                  <p>{areaDetail.nombre}</p>
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

        <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Empleados del area</h2>
            <p>Total de empleados:{areaEmployees.length}</p>
        </div>
        <div className="overflow-x-auto mt-6">
          <Table headers={employeeTableHeaders}>
            {
            dataShownEmployees.length != 0 ?
            dataShownEmployees.map((empleado, index) => (
              <TRow key={index} id={empleado.id} deleteButton={false} detail={false} >
                <TData checkbox={true} id={empleado.id}>{empleado.id}</TData>
                <TData>{empleado.correo ? empleado.correo : "-"}</TData>
                <TData>{empleado.dni ? empleado.dni : "-"}</TData>
                <TData>{empleado.sueldo ? `$${empleado.sueldo}` : "-"}</TData>
                <TData>{empleado.Provincias?.nombre }</TData>
              </TRow>
            )):
            <div className=''>No hay empleados </div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePageEmployees} nPages={nPagesEmployees} currentPage={currentPageEmployees} indexStart={indexStartEmployees}indexEnd={indexEndEmployees}/>
        </div>

        <Accordion title="Crear Nuevo Puesto">
          <Form handleSubmit={handlePositionSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Input error={createErrors.name} id={"name"} name={"name"} value={position.name} title={"Nombre"} type={"text"} placeholder={"Gerente de Ventas"} onChange={handlePositionChange}></Input>
              <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-end-2 tablet:place-self-end"}/>
            </>
          </Form>
        </Accordion>

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Puestos del area</h2>
            <p>Total de puestos:{positions.length}</p>
          </div>

          <button onClick={() => handleDeleteSelectedPositions(selectedPositions)} className="bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6">
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor"strokeLinecap="round"strokeLinejoin="round"strokeWidth="2"d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
            Eliminar Seleccionados ({selectedPositions.length})
          </button>
        </div>    

 
        <div className="overflow-x-auto mt-6">
          <Table headers={positionsTableHeaders}>
            {dataShownPositions.map((puesto, index) => (
              <TRow key={index} id={puesto.id} deleteButton={true} detail={true} path={path}>
                <TData checkbox={true} id={puesto.id} onChange={handleSelectedPositions}>
                  {puesto.id}
                </TData>
                <TData>{puesto.nombre}</TData>
              </TRow>
            ))}
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePagePositions} nPages={nPagesPositions}currentPage={currentPagePositions} indexStart={indexStartPositions}indexEnd={indexEndPositions}/>
        </div>

      </main>
    </div>
  );
};

export default AreaDetail;
