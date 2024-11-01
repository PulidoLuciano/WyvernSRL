import { useState, useCallback } from 'react';
import { generalService } from '../service/generalService'

export const useGeneral = () => {
 
  const [countries, setCountries] = useState<Array<any>>([]);
  const [states, setStates] = useState<Array<any>>([]);
  const [platforms, setPlatforms] = useState<Array<any>>([])
  const [products, setProducts] = useState<Array<any>>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<any>>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
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

  const getAllStates = useCallback(async (countries?:boolean) => {
    setLoadingCountries(true);
    setError(null);
    let url = "http://localhost:3000/provinces";
    let includeCountries = "/?include=id&include=nombre&borrado=false&include=Paises"
    try {
        // if(countries) url = url.concat(includeCountries);
        console.log(url);
        
        const data = await generalService.getAllStates(url);
        setStates(data);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoadingStates(false);
    }
  }, []);

  const getAllCategories = useCallback(async () => {
    setLoadingCategories(true);
    setError(null);
    let url = "http://localhost:3000/markets";
    try {
        const data = await generalService.getAllCategories(url);
        setCategories(data);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoadingCategories(false);
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

  return {states,categories, platforms, countries,products,getAllCategories,getAllStates,getAllProducts , getAllCountries, getAllPlatforms,loadingProducts, loadingCountries, loadingPlatforms, error };
};
