import { useState, useCallback } from 'react';
import { generalService } from '../service/generalService'

export const useGeneral = () => {
 
  const [countries, setCountries] = useState<Array<any>>([]);
  const [platforms, setPlatforms] = useState<Array<any>>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(false);
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


  return { platforms, countries , getAllCountries, getAllPlatforms, loadingCountries, loadingPlatforms, error };
};
