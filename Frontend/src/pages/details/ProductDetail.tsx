import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Nav from "../../components/Nav";
import SaveButton from "../../components/form/SaveButton";
import * as Yup from "yup";
import { CreateProductErrors, productType } from "../../utils/types/productType";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useGeneral } from "../../hooks/useGeneral";
import { productSchema } from "../../schemas/productSchema";


const ProductDetail = () => {

  const params = useParams();
  const productId = parseInt(params.productId || "", 10);

  const { getProduct, productDetail, updateProduct, error, loadingProducts } = useProducts()
  const { getAllGamesCategories, gamesCategories} = useGeneral()

  useEffect(() => {
    getProduct(productId )
  }, [getProduct])

  useEffect(() => {
    getAllGamesCategories()
  }, [getAllGamesCategories])

  
  useEffect(() => {
    if (productDetail) {
      setEditedData({
        name: productDetail.nombre,
        date: productDetail.lanzamiento,
        category: productDetail.Categorias?.id,
        price: productDetail.precio,
      })
    }
  }, [productDetail])

  const [createErrors, setCreateErrors] = useState<CreateProductErrors>({});
  const [editable, setEditable] = useState(false);


  const [editedData, setEditedData] = useState<productType>({
    name: '',
    date: '',
    category: '',
    price: '',
  });

  const handleClickEditable = () => {
    setEditable(!editable);
  };


  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await productSchema.validate(editedData, { abortEarly: false });
      
      updateProduct(productId, editedData);
      setCreateErrors({});
      handleClickEditable()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const createErrors: CreateProductErrors = {};
        err.inner.forEach((error) => {
          if (error.path)
            createErrors[error.path as keyof CreateProductErrors] =
              error.message;
        });

        setCreateErrors(createErrors);
        
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
  
  if (loadingProducts) return <p>Cargando detalles del producto...</p>;

  return (
    <div className="w-full flex ">
      <Nav />
      <main className="ms-72 p-8">
        {productDetail ? (
          <h1 className="text-2xl">
            Empleado que realizo el contacto: {productDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Empleado: ?</h1>
        )}
        {editable ? (
          <>
            <div className="my-6">
              <Form handleSubmit={handleEditSubmit} className="grid grid-rows-7 grid-cols-1 gap-y-3 tablet:grid-cols-3 tablet:grid-rows-3 tablet:gap-x-12 tablet:gap-y-12 laptopL:gap-x-32">
                <>
                  <Input id={"name"} name={"name"} value={editedData.name} title={"Nombre"} type={"text"} placeholder={""} onChange={handleEditChange} error={createErrors.name}></Input>
                  <Input id={"date"} name={"date"} value={editedData.date} title={"Fecha"} type={"text"} placeholder={"2023-04-28 00:00:00"} onChange={handleEditChange} error={createErrors.date}></Input>
                  <Select selected={productDetail.Categorias.id} id={"category"} title={"Categoria"} name={"category"} options={gamesCategories} onChange={handleEditChange} error={createErrors.category}></Select>
                  <Input id={"price"} name={"price"} value={editedData.price} title={"Precio"} type={"text"} placeholder={"69.99"} onChange={handleEditChange} error={createErrors.price}></Input>
                  <SaveButton className={"text-black bg-green my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center tablet:me-2 tablet:col-start-3 tablet:place-self-end"}/>
                </>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del producto</h2>
                <button onClick={handleClickEditable} className="bg-primary flex text-white rounded px-6 py-2" >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  fill="none"  viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Editar
                </button>
              </div>
              {productDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{productDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">Fecha</h4>
                  <p>{productDetail.lanzamiento}</p>
                  <h4 className="font-semibold text-lg">Precio</h4>
                  <p>{productDetail.precio}</p>
                  <h4 className="font-semibold text-lg">Categoria</h4>
                  <p>{productDetail.Categorias?.nombre}</p>
                </>
              ) : (
                <>
                  <p>Producto no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>
        )}

      </main>
    </div>
  )
}

export default ProductDetail