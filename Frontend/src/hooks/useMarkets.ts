import { useState, useCallback } from 'react';
import { marketsService } from '../service/marketsService'
import { marketType } from '../utils/types/suppliersType';

export const useMarkets = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [markets, setMarkets] = useState<Array<any>>([]);
    const [marketDetail, setMarketDetail] = useState<any>({});

    const [error, setError] = useState<string | null>(null);

    const getMarkets = async()=>{
        setLoading(true);
        setError(null)
        let url = `http://localhost:3000/markets`
        try {
        const data = await marketsService.getMarkets(url);
        setMarkets(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const getMarket = async( id: number)=>{
        setLoading(true);
        setError(null)
        let url = `http://localhost:3000/markets/${id}`
        try {
        const data = await marketsService.getMarkets(url);
        setMarketDetail(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    const createMarket = async (marketData: marketType) => {
        setLoading(true);
        setError(null)
        try {
        await marketsService.createMarket(marketData)
        await getMarkets()
        } catch (err:any) {
        setError(err.message)
        }finally{
        setLoading(false)
        }
    }

    const updateMarket = async(id:number, marketData: marketType)=>{
        setLoading(true)
        setError(null)
         try {
         await marketsService.updateMarket(id, marketData);
         await getMarket(id);
        } catch (err : any) {
         setError(err.message)
        }finally{
         setLoading(false)
        }
    
     }

    
    return {getMarkets, getMarket, updateMarket, createMarket, markets, marketDetail, loading, error  };
}
