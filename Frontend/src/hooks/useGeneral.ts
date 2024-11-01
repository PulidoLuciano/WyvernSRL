import { useState, useCallback } from 'react';
import { generalService } from '../service/generalService'

export const useGeneral = () => {
 
  const [countries, setCountries] = useState<Array<any>>([]);
  const [platforms, setPlatforms] = useState<Array<any>>([])
  const [products, setProducts] = useState<Array<any>>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCountries = useCallback(async () => {
    setLoadingCountries(true);
    setError(null);
    let urlCountries = "http://localhost:3000/countries";
    try {
        const data = await generalService.getAllCountries(urlCountries);
        setCountries(data);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoadingCountries(false);
    }
  }, []);

  const getAllPlatforms = useCallback(async () => {
    setLoadingPlatforms(true);
    setError(null);
    let urlPlatforms = "http://localhost:3000/platforms";
    try {
        const data = await generalService.getAllPlatforms(urlPlatforms);
        setPlatforms(data);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoadingPlatforms(false);
    }
  }, []);

  const getAllProducts = useCallback(async()=>{
    setLoadingProducts(true);
    setError(null)
    let urlProducts = "http://localhost:3000/products"
    try {
      const data = await generalService.getAllProducts(urlProducts);
      setProducts(data)
    } catch (err : any) {
      setError(err.message);
    }finally{
      setLoadingProducts(false);
    }
  },[])

  return { platforms, countries,products,getAllProducts , getAllCountries, getAllPlatforms,loadingProducts, loadingCountries, loadingPlatforms, error };
};
