import { useState, useCallback } from 'react';
import { productsService } from '../service/productService'
import { productType } from '../utils/types/productType';

export const useProducts = () => {

    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [products, setProducts] = useState<Array<any>>([]);
    const [productSales, setProductSales] = useState<Array<any>>([]);
    const [productDetail, setProductDetail] = useState<any>({});

    const [error, setError] = useState<string | null>(null);


    const getAllProducts = useCallback(async (categories?:boolean) => {
        setLoadingProducts(true);
        setError(null)
        let url = "http://localhost:3000/products/?borrado=false"
        let includeStatements = "&include=id&include=lanzamiento&include=precio&include=nombre&include=Categorias"
        try {
    
          if(categories) url = url.concat(includeStatements);
    
          const data = await productsService.getAllProducts(url);
          setProducts(data)
        } catch (err: any) {
          setError(err.message);
        } finally {
            setLoadingProducts(false);
        }
      }, [])

      const getProduct = useCallback(async (id: number) => {
        setLoadingProducts(true);
        setError(null);
        let url = `http://localhost:3000/products/${id}/?include=id&include=lanzamiento&include=precio&include=nombre&include=Categorias`;
        try {
          const data = await productsService.getOne(url);
          setProductDetail(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoadingProducts(false);
        }
      }, []);


      const getProductSales = useCallback(async (id: number) => {
        setLoadingProducts(true);
        setError(null)
        let url = `http://localhost:3000/sales/?Productos_id=${id}&include=Clientes&include=Productos&include=fecha`
        try {
    
          const data = await productsService.getAllProducts(url);
          setProductSales(data)
        } catch (err: any) {
          setError(err.message);
        } finally {
            setLoadingProducts(false);
        }
      }, [])


      const createProduct = async (productData: productType) => {
        setLoadingProducts(true);
        setError(null)
        try {
          await productsService.createProduct(productData)
          await getAllProducts(true)
        } catch (err:any) {
          setError(err.message)
        }finally{
            setLoadingProducts(false)
        }
      }

      const updateProduct = async(id:number,productData: productType)=>{
        
        setLoadingProducts(true)
        setError(null)
         try {
         await productsService.updateProduct(id,productData);
         await getProduct(id);
        } catch (err : any) {
         setError(err.message)
        }finally{
         setLoadingProducts(false)
        }
    
     }
    
      const deleteProducts = async(ids:Array<string>) => {
        setLoadingProducts(true);
        setError(null);
        let url = "http://localhost:3000/products/";
        try {
          const response = await productsService.deleteProduct(url, ids);
          await getAllProducts(true);
          console.log(await response);
          return response;
        } catch (err: any) {
          setError(err.message);
        } finally {
            setLoadingProducts(false);
        }
      }
 
    return { getAllProducts, getProduct,productDetail, getProductSales, productSales,updateProduct, products, createProduct, deleteProducts, loadingProducts, error };
}
