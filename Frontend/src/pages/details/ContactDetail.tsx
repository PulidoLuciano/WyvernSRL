import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Nav from "../../components/Nav";
import SaveButton from "../../components/form/SaveButton";
import { useGeneral } from "../../hooks/useGeneral";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useClients } from "../../hooks/useClients";
import { contactType, createContactErrors } from "../../utils/types/clientType";
import { contactSchema } from "../../schemas/contactSchema";

const ContactDetail = () => {
  const params = useParams();
  const contactId = parseInt(params.contactId || "", 10);
  const clientId = parseInt(params.clientId || "", 10);
  
  const { contactDetail , getContact, updateContact, loading, error} = useClients();
  const { getAllMedias,medias } = useGeneral();
  
  useEffect(() => {
    getContact(contactId)
  }, []);
  
  useEffect(() => {
    getAllMedias()
  }, [getAllMedias]);

  useEffect(() => {
    if (contactDetail) {
      setEditedData({
        Clientes_id: contactDetail.Clientes.id,
        Medio: contactDetail.Medios.id,
        duracion: contactDetail.duracion,
        fecha: contactDetail.fecha,
        motivo: contactDetail.motivo,
      })
    }
    
  }, [contactDetail])

  console.log(contactDetail);
  
  const [createErrors, setCreateErrors] = useState<createContactErrors>({});
  const [editable, setEditable] = useState(false);

  const [editedData, setEditedData] = useState<contactType>({
    Clientes_id: clientId,
    Medio: '',
    duracion: '',
    fecha: '',
    motivo: '',
  });

  const handleClickEditable = () => {
    setEditable(!editable);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await contactSchema.validate(editedData, { abortEarly: false });
      
      updateContact(contactId, editedData);
      setCreateErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: createContactErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof createContactErrors] =
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

  if (loading) return <p>Cargando detalles del contacto...</p>;

  return (
    <div className="w-full flex ">
      <Nav />
      <main className="ms-72 p-8">
        {contactDetail ? (
          <h1 className="text-2xl">
            Empleado que realizo el contacto: {contactDetail.Clientes.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Empleado: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"motivo"} name={"motivo"} value={editedData.motivo} title={"Motivo"} type={"text"} placeholder={""} onChange={handleEditChange} error={createErrors.motivo}></Input>
                  <Input id={"fecha"} name={"fecha"} value={editedData.fecha} title={"Fecha"} type={"text"} placeholder={"2023-04-28 00:00:00"} onChange={handleEditChange} error={createErrors.fecha}></Input>
                  <Select selected={editedData.Medio} id={"medios"} title={"Medio"} name={"Medio"} options={medias} onChange={handleEditChange} error={createErrors.Medio}></Select>
                  {editedData.Medio=='1' ? <Input id={"duracion"} name={"duracion"} value={editedData.duracion} title={"Duracion"} type={"text"} placeholder={"182.5"} onChange={handleEditChange} error={createErrors.duracion}></Input> : <></> }
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
              {contactDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Motivo</h4>
                  <p>{contactDetail.motivo}</p>
                  <h4 className="font-semibold text-lg">Fecha</h4>
                  <p>{contactDetail.fecha}</p>
                  <h4 className="font-semibold text-lg">Medio</h4>
                  <p>{contactDetail.Medios.nombre}</p>
                  {contactDetail.Medios.nombre=='Telefono' ? 
                  <>
                    <h4 className="font-semibold text-lg">Duracion</h4>
                    <p>{contactDetail.duracion}</p>
                  </>:<></> }
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

      </main>
    </div>
  );
};

export default ContactDetail;
