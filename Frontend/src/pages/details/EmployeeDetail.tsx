import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import Accordion from "../../components/Accordion";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Nav from "../../components/Nav";
import SaveButton from "../../components/form/SaveButton";
import Table from "../../components/table/Table";
import TRow from "../../components/table/TRow";
import TData from "../../components/table/TData";
import { useGeneral } from "../../hooks/useGeneral";
import { useParams } from "react-router-dom";
import { CreateEmployeesErrors, employeeType } from "../../utils/types/employeeType";
import * as Yup from "yup";
import { useEmployees } from "../../hooks/useEmployees";
import { employeeSchema } from "../../schemas/employeeSchema";
import { careerTableHeaders } from "../../utils/dataArrays";


const EmployeeDetail = () => {
  const params = useParams();
  const employeeId = parseInt(params.employeeId || "", 10);

  const {getEmployee, employeeDetail, employeePosition, employeeCareer, getEmployeeCareer, getEmployeePosition ,loading,error, updateEmployee} = useEmployees();
  const { states, countries, positions, getAllPositions, getAllStates, getAllCountries } = useGeneral();
  
  useEffect(() => {
    getEmployee(employeeId);
    getEmployeePosition(employeeId)
    getEmployeeCareer(employeeId)
  }, []);

  useEffect(() => {
    getAllStates();
    getAllCountries();
    getAllPositions()
  }, [])
  
  useEffect(() => {
    if (employeeDetail && employeePosition) {
      setEditedData({
        name: employeeDetail.nombre,
        email: employeeDetail.correo,
        phone: employeeDetail.telefono,
        dni: employeeDetail.dni,
        hiringDate: employeeDetail.fechaContratacion.slice(0,10),
        salary: employeeDetail.sueldo,
        country: employeeDetail.Provincias.Paises_id,
        state: employeeDetail.Provincias.id,
        position: employeePosition.Puestos.id
      })
    }
    
    const previousStates = states.filter(s => s.Paises_id == employeeDetail.Provincias?.Paises_id);

      setEditFormStates(previousStates);
  }, [employeeDetail, employeePosition])
  
  const [createFormStates,setCreateFormStates] = useState<Array<any>>([]);
  const [dataLength, setDataLength] = useState<number>(10);
  const [createErrors, setCreateErrors] = useState<CreateEmployeesErrors>({});
  const [currentPageCareer, setCurrentPageCareer] = useState<number>(1);
  const [editable, setEditable] = useState(false);
  const [selectedDataCareer, setSelectedDataCareer] = useState<Array<string>>([]);
  const [editFormStates,setEditFormStates] = useState<Array<any>>([])
  const [selectedDataContact, setSelectedDataContact] = useState<Array<string>>([]);

  const [editedData, setEditedData] = useState<employeeType>({
    name: '',
    phone: '',
    email: '',
    dni:'',
    hiringDate: null,
    country: '',
    state: '',
    salary: '',
    position: '',
  });

  const indexEndCareer = currentPageCareer * dataLength;
  const indexStartCareer = indexEndCareer - dataLength;
  const nPagesCareer = employeeCareer? Math.ceil(employeeCareer.length / dataLength): 0;
  const dataShownCareer = employeeCareer? employeeCareer.slice(indexStartCareer, indexEndCareer): [];

  const changePageCareer = (nextPage: number) => {
    setCurrentPageCareer(nextPage);
  };
  const handleClickEditable = () => {
    setEditable(!editable);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await employeeSchema.validate(editedData, { abortEarly: false });
      
      updateEmployee(employeeId, editedData);
      setCreateErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: CreateEmployeesErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof CreateEmployeesErrors] =
              error.message;
        });

        setCreateErrors(createErrors);
        console.log(createErrors);
        
      }
    }
  };
  
  const handleEditChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name == "country"){
      const statesAvailables = states.filter(s => s.Paises_id == Number.parseInt(value))
      setEditFormStates(statesAvailables)
    }
    setEditedData({
      ...editedData,
      [name]: value
    });
  };
  

  if (loading) return <p>Cargando detalles del cliente...</p>;

  return (
   
     
      <main className="w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative">
        {employeeDetail ? (
          <h1 className="text-2xl">
            Visualización Empleado: {employeeDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Empleado: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"nombre"} name={"name"} value={editedData.name} title={"Nombre de Usuario"} type={"text"} placeholder={"Martin"} onChange={handleEditChange} error={createErrors.name}></Input>
                  <Input id={"correo"} name={"email"} value={editedData.email} title={"Email"} type={"text"} placeholder={"username@gmail.com"} onChange={handleEditChange} error={createErrors.email}></Input>
                  <Input id={"dni"} name={"dni"} value={editedData.dni} title={"DNI"} type={"number"} placeholder={"48498498498"} onChange={handleEditChange} error={createErrors.dni}></Input>
                  <Input id={"telefono"} name={"phone"} value={editedData.phone} title={"Telefono"} type={"text"} placeholder={"+3814848949"} onChange={handleEditChange} error={createErrors.phone}></Input>
                  <Input id={"fechaContratacion"} name={"hiringDate"} value={editedData.hiringDate} title={"Fecha de contratacion"} type={"date"} placeholder={"2024-09-30 14:30:14"} onChange={handleEditChange} error={createErrors.hiringDate}></Input>
                  <Input id={"salario"} name={"salary"} value={editedData.salary} title={"Salario"} type={"number"} placeholder={"853000.45"} onChange={handleEditChange} error={createErrors.salary}></Input>
                  <Select selected={employeeDetail.Provincias.Paises_id} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleEditChange} error={createErrors.country}></Select>
                  <Select selected={employeeDetail.Provincias.id} id={"provincia"} title={"Provincia"} name={"state"} options={editFormStates} onChange={handleEditChange} error={createErrors.state}></Select>
                  <Select selected={employeePosition.Puestos.id} id={"puesto"} title={"Puesto"} name={"position"} options={positions} onChange={handleEditChange} error={createErrors.position}></Select>
                  <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"}/>
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del empleado</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {employeeDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{employeeDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">Correo</h4>
                  <p className="underline decoration-1">
                    {employeeDetail.correo}
                  </p>
                  <h4 className="font-semibold text-lg">Teléfono</h4>
                  <p>{employeeDetail.telefono ? employeeDetail.telefono : "-"}</p>
                  <h4 className="font-semibold text-lg">DNI</h4>
                  <p>{employeeDetail.dni}</p>
                  <h4 className="font-semibold text-lg">Fecha de contratacion</h4>
                  <p>{employeeDetail.fechaContratacion?.slice(0,10)}</p>
                  <h4 className="font-semibold text-lg">Sueldo</h4>
                  <p>{employeeDetail.sueldo}</p>
                  <h4 className="font-semibold text-lg">Puesto</h4>
                  <p>{employeePosition ? employeePosition.Puestos.nombre : "-"}</p>
                  <h4 className="font-semibold text-lg">Area</h4>
                  <p>{employeePosition ? employeePosition.Puestos.Areas.nombre : "-"}</p>
                </>
              ) : (
                <>
                  <p>Empleado no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Historial de puestos del empleado</h2>
            <p>Total de puestos:{employeeCareer ? employeeCareer.length: 0}</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
        {loading && <p>Cargando puestos...</p>}
          <Table headers={careerTableHeaders}>
            {dataShownCareer.length !=0 ?
            dataShownCareer.map((position, index) => (
              <TRow key={index} id={position.id} detail={false}>
                <TData id={position.id} >
                  {position.Puestos.nombre}
                </TData>
                <TData>{position.Puestos.Areas.nombre}</TData>
                <TData>{position.fechaInicio?.slice(0,10)}</TData>
                <TData>{position.fechaFinal?.slice(0,10)}</TData>
              </TRow>
            )):
            <div className=''>Este empleado aun no tiene puestos en su carrera</div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePageCareer} nPages={nPagesCareer}currentPage={currentPageCareer} indexStart={indexStartCareer}indexEnd={indexEndCareer}/>
        </div>

      </main>
    
  );
};

export default EmployeeDetail;
