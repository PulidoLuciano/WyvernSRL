import { useState, useCallback } from 'react';
import { generalService } from '../service/generalService'
import { productType } from '../utils/types/productType';

export const useGeneral = () => {

  const [countries, setCountries] = useState<Array<any>>([]);
  const [positions, setPositions] = useState<Array<any>>([]);
  const [medias, setMedias] = useState<Array<any>>([]);
  const [LoadingMedias, setLoadingMedias] = useState<boolean>(false);
  const [states, setStates] = useState<Array<any>>([]);
  const [platforms, setPlatforms] = useState<Array<any>>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [gamesCategories, setGamesCategories] = useState<Array<any>>([]);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(false)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(false);
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

  const getAllMedias = useCallback(async () => {
    setLoadingMedias(true);
    setErrorGeneral(null)
    let urlMedias = "http://localhost:3000/medias"
    try {
      const data = await generalService.getAllMedias(urlMedias);
      setMedias(data)
    } catch (err: any) {
      setErrorGeneral(err.message);
    } finally {
      setLoadingMedias(false);
    }
  }, [])

  const getAllCurrencies = useCallback(async () => {
    setLoadingCurrencies(true);
    setErrorGeneral(null)
    let url = "http://localhost:3000/currencies"
    try {
      const data = await generalService.getAllCategories(url);
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

  return { breaches,states, positions, categories, platforms, gamesCategories, loadingGamesCategories, currencies, countries, medias, getAllGamesCategories, getAllCurrencies, getAllPositions,getAllBreaches, getAllStates, getAllCountries, getAllPlatforms, getAllMedias, LoadingMedias, loadingCountries, loadingPositions, loadingPlatforms, errorGeneral,loadingBreaches };

};
