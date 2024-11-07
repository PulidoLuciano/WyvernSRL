import { useState, useCallback } from 'react';
import { positionService } from "../service/positionService";
import { positionType } from '../utils/types/positionType'

export const usePositions = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [positions, setPositions] = useState<Array<any>>([]);
    const [error, setError] = useState<string | null>(null);
    const [positionDetail, setPositionDetail] = useState<any>({});
    const [positionEmployees, setPositionEmployees] = useState<Array<any>>([]);

    const getPositions = async( id: number)=>{
        setLoading(true);
        setError(null)
        let url = `http://localhost:3000/positions/?Areas_id=${id}`
        try {
        const data = await positionService.getPositions(url);
        setPositions(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const getPosition = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/positions/${id}/?include=id&include=nombre`;
        try {
          const data = await positionService.getPosition(url);
          setPositionDetail(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);

      const getPositionEmployees = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/positions/${id}/employees`;
        try {
          const data = await positionService.getPosition(url);
          setPositionEmployees(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);


    const createPosition = async (areaId: number, positionData: positionType) => {
        setLoading(true);
        setError(null)
        try {
        await positionService.createPosition(areaId, positionData)
        await getPositions(areaId)
        } catch (err:any) {
        setError(err.message)
        }finally{
        setLoading(false)
        }
    }

    const deletePosition = async(areaId:number ,ids:Array<string>) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/areas/";
        try {
        const response = await positionService.deletePosition(url, ids);
        await getPositions(areaId);
        return response;
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const updatePosition = async(id:number, areaId:number, positionData: positionType)=>{
        setLoading(true)
        setError(null)
         try {
         await positionService.updatePosition(id, areaId, positionData);
         await getPosition(id);
        } catch (err : any) {
         setError(err.message)
        }finally{
         setLoading(false)
        }
    
     }
    
      
    
    return {getPositions, positions, getPosition, positionDetail, getPositionEmployees, positionEmployees, createPosition, deletePosition, updatePosition, loading, error, };
}
