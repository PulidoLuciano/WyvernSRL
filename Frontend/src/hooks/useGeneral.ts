import { useState, useCallback } from 'react';
import { generalService } from '../service/generalService'
import { productType } from '../utils/types/productType';
import { areaType } from '../utils/types/positionType';

export const useGeneral = () => {

  const [countries, setCountries] = useState<Array<any>>([]);
  const [positions, setPositions] = useState<Array<any>>([]);
  const [medias, setMedias] = useState<Array<any>>([]);
  const [areas, setAreas] = useState<Array<any>>([]);
  const [LoadingMedias, setLoadingMedias] = useState<boolean>(false);
  const [states, setStates] = useState<Array<any>>([]);
  const [platforms, setPlatforms] = useState<Array<any>>([])
  const [products, setProducts] = useState<Array<any>>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [gamesCategories, setGamesCategories] = useState<Array<any>>([]);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(false)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
  const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingGamesCategories, setLoadingGamesCategories] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<Array<any>>([])
  const [loadingCurrencies, setLoadingCurrencies] = useState<boolean>(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [breaches, setBreaches] = useState<Array<any>>([])
  const [loadingBreaches, setLoadingBreaches] = useState<boolean>(false);

  const getAllCountries = useCallback(async () => {
    setLoadingCountries(true);
    setErrorGeneral(null);
    let urlCountries = "http://localhost:3000/countries";
    try {
      const data = await generalService.getAllCountries(urlCountries);
      setCountries(data);
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingCountries(false);
    }
  }, []);

  const getAllStates = useCallback(async (countries?: boolean) => {
    setLoadingCountries(true);
    setErrorGeneral(null);
    let url = "http://localhost:3000/provinces";
    let includeCountries = "/?include=id&include=nombre&borrado=false&include=Paises"
    try {
      // if(countries) url = url.concat(includeCountries);

      const data = await generalService.getAllStates(url);
      setStates(data);
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingStates(false);
    }
  }, []);

  const getAllCategories = useCallback(async () => {
    setLoadingCategories(true);
    setErrorGeneral(null);
    let url = "http://localhost:3000/markets";
    try {
      const data = await generalService.getAllCategories(url);
      setCategories(data);
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const getAllPlatforms = useCallback(async () => {
    setLoadingPlatforms(true);
    setErrorGeneral(null);
    let urlPlatforms = "http://localhost:3000/platforms";
    try {
      const data = await generalService.getAllPlatforms(urlPlatforms);
      setPlatforms(data);
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingPlatforms(false);
    }
  }, []);

  const getAllProducts = useCallback(async (categories?:boolean) => {
    setLoadingProducts(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/products/?borrado=false"
    let includeStatements = "&include=id&include=lanzamiento&include=precio&include=nombre&include=Categorias"
    try {

      if(categories) url = url.concat(includeStatements);

      const data = await generalService.getAllProducts(url);
      setProducts(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }, [])

  const getAllMedias = useCallback(async () => {
    setLoadingMedias(true);
    setErrorGeneral(null)
    let urlMedias = "http://localhost:3000/medias"
    try {
      const data = await generalService.getAllProducts(urlMedias);
      setMedias(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }, [])

  const getAllCurrencies = useCallback(async () => {
    setLoadingCurrencies(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/currencies"
    try {
      const data = await generalService.getAllProducts(url);
      setCurrencies(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingCurrencies(false);
    }
  }, [])

  const getAllBreaches = async()=>{
    setLoadingBreaches(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/breach_levels"
    try {
      const data = await generalService.getAllCategories(url);
      setBreaches(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingBreaches(false);
    }
  }


  const getAllPositions = useCallback(async () => {
    setLoadingCurrencies(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/positions"
    try {
      const data = await generalService.getAllPositions(url);
      setPositions(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingPositions(false);
    }
  }, [])

  const getAllGamesCategories = async()=>{
    setLoadingGamesCategories(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/categories/"
    try {
      const data = await generalService.getAllCategories(url);
      setGamesCategories(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingGamesCategories(false);
    }
  }

  const createProduct = async (productData: productType) => {
    setLoadingProducts(true);
    setErrorGeneral(null)
    try {
      await generalService.createProduct(productData)
      await getAllProducts(true)
    } catch (err:any) {
      setErrorGeneral(err.message)
    }finally{
      setLoadingProducts(false)
    }
  }

  const deleteProducts = async(ids:Array<string>) => {
    setLoadingProducts(true);
    setErrorGeneral(null);
    let url = "http://localhost:3000/products/";
    try {
      const response = await generalService.deleteObj(url, ids);
      await getAllProducts(true);
      console.log(await response);
      return response;
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  const getAllAreas = async()=>{
    setLoadingAreas(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/areas/?include=id&include=nombre&borrado=false"
    try {
      const data = await generalService.getAllAreas(url);
      setAreas(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingAreas(false);
    }
  }

  const createArea = async (areaData: areaType) => {
    setLoadingAreas(true);
    setErrorGeneral(null)
    try {
      await generalService.createArea(areaData)
      await getAllAreas()
    } catch (err:any) {
      setErrorGeneral(err.message)
    }finally{
      setLoadingAreas(false)
    }
  }

  const deleteArea = async(ids:Array<string>) => {
    setLoadingProducts(true);
    setErrorGeneral(null);
    let url = "http://localhost:3000/areas/";
    try {
      const response = await generalService.deleteArea(url, ids);
      await getAllAreas();
      return response;
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }


  return { breaches,states, positions, categories, platforms, gamesCategories, areas, loadingGamesCategories, currencies, countries, products, medias,createProduct,getAllGamesCategories, getAllCurrencies, getAllPositions,getAllBreaches, getAllCategories, getAllStates, getAllProducts, getAllCountries, getAllPlatforms, getAllMedias,deleteProducts,getAllAreas, createArea, deleteArea, loadingProducts, LoadingMedias, loadingCountries, loadingPositions, loadingPlatforms, errorGeneral,loadingBreaches };

};
