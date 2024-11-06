import { useState, useCallback } from 'react';
import { areaType } from '../utils/types/areaType';
import { areaService } from "../service/areaService";

export const useAreas = () => {

    const [areas, setAreas] = useState<Array<any>>([]);
    const [areaEmployees, setAreaEmployees] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [areaDetail, setAreaDetail] = useState<any>([]);

    const getAllAreas = async()=>{
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/areas/?include=id&include=nombre&borrado=false"
        try {
        const data = await areaService.getAllAreas(url);
        setAreas(data)
        } catch (err: any) {
            setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const getAreaEmployees = async( id: number)=>{
      setLoading(true);
      setError(null)
      let url = `http://localhost:3000/areas/${id}/employees`
      try {
      const data = await areaService.getAreaEmployees(url);
      setAreaEmployees(data)
      } catch (err: any) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
    }

    const createArea = async (areaData: areaType) => {
        setLoading(true);
        setError(null)
        try {
        await areaService.createArea(areaData)
        await getAllAreas()
        } catch (err:any) {
        setError(err.message)
        }finally{
        setLoading(false)
        }
    }

    const deleteArea = async(ids:Array<string>) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/areas/";
        try {
        const response = await areaService.deleteArea(url, ids);
        await getAllAreas();
        return response;
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const getArea = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/areas/${id}/?include=id&include=nombre`;
        try {
          const data = await areaService.getOne(url);
          setAreaDetail(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);

      const updateArea = async(id:number,areaData:areaType)=>{
        setLoading(true)
        setError(null)
         try {
         await areaService.updateArea(id,areaData);
         await getArea(id);
        } catch (err : any) {
         setError(err.message)
        }finally{
         setLoading(false)
        }
    
     }



      
    
    return { getAllAreas, areas, getAreaEmployees, areaEmployees, createArea, deleteArea, getArea, areaDetail, loading, error, updateArea };
}

