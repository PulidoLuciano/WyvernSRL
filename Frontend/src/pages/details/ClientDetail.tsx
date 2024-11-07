import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import Accordion from "../../components/Accordion";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Checkbox from "../../components/form/Checkbox";
import Select from "../../components/form/Select";
import Nav from "../../components/Nav";
import SaveButton from "../../components/form/SaveButton";
import Table from "../../components/table/Table";
import TRow from "../../components/table/TRow";
import TData from "../../components/table/TData";
import { useGeneral } from "../../hooks/useGeneral";
import { useLocation, useParams } from "react-router-dom";
import { useClients } from "../../hooks/useClients";
import { contactType, createContactErrors } from "../../utils/types/clientType";
import * as Yup from "yup";
import { contactSchema } from "../../schemas/contactSchema";
import { contactTableHeaders, purchasesTableHeaders} from "../../utils/dataArrays"
import { clientSchema } from "../../schemas/clientsSchema";


const ClientData = () => {
  const params = useParams();
  const { pathname } = useLocation()
  const clientId = parseInt(params.clientId || "", 10);
  
  const path = pathname.slice(1)
  
  const {getClient,clientDetail,loading,error,getAllContacts,contacts, deleteContact, createContact,
  getClientsPurchases,clientPurchases,updateClient} = useClients();
  
  const { getAllCountries,getAllPlatforms,getAllMedias,medias,platforms,countries,} = useGeneral();

  useEffect(() => {
    getClient(clientId);
    getAllContacts(clientId);
    getClientsPurchases(clientId)
  }, [getClient, getAllContacts, getClientsPurchases]);

  useEffect(() => {
    getAllCountries();
    getAllPlatforms();
    getAllMedias();
  }, [getAllCountries, getAllPlatforms, getAllMedias]);

  useEffect(() => {
    if (clientDetail) {
      setEditedData({
        name: clientDetail.nombre,
        phone: clientDetail.telelofono,
        email: clientDetail.correo,
        platform: clientDetail.Plataformas.id,
        suscription: `${clientDetail.suscripto}`,
        country: clientDetail.Paises.id,
      })
    }
    console.log(clientDetail);
    
  }, [clientDetail])

  const [dataLength, setDataLength] = useState<number>(10);
  const [createErrors, setCreateErrors] = useState<createContactErrors>({});
  const [currentPageContacts, setCurrentPageContacts] = useState<number>(1);
  const [currentPagePurchases, setCurrentPagePurchases] = useState<number>(1);
  const [editable, setEditable] = useState(false);
  const [selectedDataContact, setSelectedDataContact] = useState<Array<string>>([]);

  const [editedData, setEditedData] = useState({
    name: '',
    phone: '',
    email: '',
    platform: '',
    suscription: '',
    country: '',
  });

  const [contact, setContact] = useState<contactType>({
    Clientes_id: clientId,
    Medio: '',
    duracion: '',
    fecha: '',
    motivo: '',
  });

  const indexEndPurchases= currentPagePurchases * dataLength;
  const indexStartPurchases = indexEndPurchases - dataLength;
  const nPagesPurchases = Math.ceil(clientPurchases.length / dataLength);
  const dataShownPurchases = clientPurchases.slice(indexStartPurchases, indexEndPurchases);

  const indexEndContacts = currentPageContacts * dataLength;
  const indexStartContacts = indexEndContacts - dataLength;
  const nPagesContacts = Math.ceil(contacts.length / dataLength);
  const dataShownContacts = contacts.slice(indexStartContacts, indexEndContacts);


  const changePagePurchases = (nextPage: number) => {
    setCurrentPagePurchases(nextPage);
  };

  const changePageContacts = (nextPage: number) => {
    setCurrentPageContacts(nextPage);
  };
  const handleClickEditable = () => {
    setEditable(!editable);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await contactSchema.validate(contact, { abortEarly: false });
      createContact(clientId, contact);
      setCreateErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: createContactErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof createContactErrors] =
              error.message;
        });

        setCreateErrors(createErrors);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.children;
    
    try {
      await clientSchema.validate(editedData, { abortEarly: false });
      updateClient(clientId, editedData);
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
      }
    }
  };

  const handleContactChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleEditChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(editedData.suscription);
    
    if (editedData.suscription == "false" && e.target.type == "checkbox") {
      
      setEditedData({
        ...editedData,
        suscription: "true"
      })
    } else if (editedData.suscription == "true" && e.target.type == "checkbox") {
      setEditedData({
        ...editedData,
        suscription: "false"
      })

    } else {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };
  
  const handleSelectedItemContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedData;
    const dataExist = selectedDataContact.find((d) => d == e.target.id);

    if (dataExist) {
      newSelectedData = selectedDataContact.filter((d) => d != dataExist);
      setSelectedDataContact(newSelectedData);
    } else {
      setSelectedDataContact([...selectedDataContact, e.target.id]);
    }
  };

  const handleDeleteSelectedDataContact = async (selectedDataContact: Array<string>) => {
    if (!selectedDataContact || selectedDataContact.length == 0) {
      return;
    } else {
      const dataDelete = await deleteContact(clientId, selectedDataContact);
      if (dataDelete) console.log("contactos eliminados exitosamente");
      setSelectedDataContact([]);
    }
  };


  if (loading) return <p>Cargando detalles del cliente...</p>;

  return (
    <div className="w-full flex ">
      <Nav />
      <main className="ms-72 p-8">
        {clientDetail ? (
          <h1 className="text-2xl">
            Visualización cliente: {clientDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización cliente: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"nombreCliente"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} placeholder={"username"} onChange={handleEditChange} error=""></Input>
                  <Input id={"correo"} name={"email"} value={editedData.email} title={"Correo"} type={"text"} placeholder={"Username@user.com"} onChange={handleEditChange} error=""></Input>
                  <Input id={"telefono"} name={"phone"} value={editedData.phone} title={"Teléfono"} type={"number"}placeholder={"5493816341612"} onChange={handleEditChange} error=""></Input>
                  <Select selected={clientDetail.Plataformas.id} id={"plataformas"} name={"platform"} title={"Plataforma"} options={platforms} onChange={handleEditChange}></Select>
                  <Checkbox title={"Suscripto"} name={"suscription"} onChange={handleEditChange}></Checkbox>
                  <Select selected={clientDetail.Paises.id} id={"paises"} title={"País"} name={"country"} options={countries} onChange={handleEditChange}></Select>
                  <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"}/>
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del cliente</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {clientDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{clientDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">Correo</h4>
                  <p className="underline decoration-1">
                    {clientDetail.correo}
                  </p>
                  <h4 className="font-semibold text-lg">Teléfono</h4>
                  <p>{clientDetail.telefono}</p>
                  <h4 className="font-semibold text-lg">Plataforma</h4>
                  <p>{clientDetail.Plataformas?.nombre}</p>
                  <h4 className="font-semibold text-lg">País</h4>
                  <p>{clientDetail.Paises?.nombre}</p>
                  <h4 className="font-semibold text-lg">Suscripto</h4>
                  <p>{clientDetail.suscripto ? "Sí" : "No"}</p>
                </>
              ) : (
                <>
                  <p>Cliente no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}

        <Accordion title="Crear Nuevo Contacto">
          <Form handleSubmit={handleContactSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
            <>
              <Select id={"medios"} name={"Medio"} title={"Medios"} options={medias} onChange={handleContactChange} error={createErrors.Medio}></Select>
               {contact.Medio=='1' ? <Input id={"duracion"} name={"duracion"} value={contact.duracion} title={"Duracion"} type={"text"} placeholder={"182.5"} onChange={handleContactChange} error={createErrors.duracion}></Input>: <></>}
              <Input error={createErrors.motivo} id={"motivo"} name={"motivo"} value={contact.motivo} title={"Motivo"} type={"text"} placeholder={""} onChange={handleContactChange}></Input>
              <Input error={createErrors.fecha} id={"fecha"} name={"fecha"} value={contact.fecha} title={"Fecha"} type={"text"} placeholder={"2023-04-28 00:00:00"} onChange={handleContactChange}></Input>
              <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"}/>
            </>
          </Form>
        </Accordion>

        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Compras del cliente</h2>
            <p>Total de compras:{clientPurchases.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <Table headers={purchasesTableHeaders}>
            {
            dataShownPurchases.length != 0 ?
            dataShownPurchases.map((compras, index) => (
              <TRow key={index} id={compras.id} deleteButton={false} detail={false}>
                <TData checkbox={true} id={compras.id} >
                  {compras.id}
                </TData>
                <TData>{compras.Productos.nombre}</TData>
                <TData>{compras.fecha}</TData>
              </TRow>
            )):
            <div className=''>No hay compras </div>
          }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePagePurchases} nPages={nPagesPurchases}currentPage={currentPagePurchases} indexStart={indexStartPurchases}indexEnd={indexEndPurchases}/>
        </div>


        <div className="grid grid-rows-2 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6">
          <div className="flex flex-col gap-2 items-start tablet:col-span-2">
            <h2 className="text-3xl">Contactos del cliente</h2>
            <p>Total de contactos:{contacts.length}</p>
          </div>

          <button onClick={() => handleDeleteSelectedDataContact(selectedDataContact)} className="bg-red font-semibold text-sm rounded flex items-center justify-center p-3 tablet:col-start-3 tablet:gap-2 laptopL:col-start-5 laptopL:col-end-6">
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor"strokeLinecap="round"strokeLinejoin="round"strokeWidth="2"d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
            Eliminar Seleccionados ({selectedDataContact.length})
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <Table headers={contactTableHeaders}>
            {
            dataShownContacts. length !=0 ?
            dataShownContacts.map((contactos, index) => (
              <TRow key={index} id={contactos.id} path={path} deleteButton={true} detail={true}>
                <TData checkbox={true} id={contactos.id}  onChange={handleSelectedItemContact}>
                  {contactos.id}
                </TData>
                <TData>{contactos.motivo}</TData>
                <TData>{contactos.fecha}</TData>
                <TData>{contactos.Medios.nombre}</TData>
              </TRow>
            )):
            <div className=''>No hay contactos </div>
            }
          </Table>
        </div>

        <div className="flex items-center justify-center laptop:justify-end gap-6 my-6"id="paginacionTabla">
          <Pagination changePage={changePageContacts} nPages={nPagesContacts} currentPage={currentPageContacts} indexStart={indexStartContacts}indexEnd={indexEndContacts}/>
        </div>
      </main>
    </div>
  );
};

export default ClientData;
