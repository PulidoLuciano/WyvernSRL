import { useState, useCallback } from "react";
import { statsService } from "../service/statsService";

export const useStats = () => {
    

    const [monthSales, setMonthSales] = useState<Array<any>>([])
    const [countrySales, setCountrySales] = useState<Array<any>>([])
    const [platformSales, setPlatformSales] = useState<Array<any>>([])
    const [productSales, setProductSales] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getMonthSales = useCallback(async () => {
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/sales/stats/months"
        try {
        const data = await statsService.getAll(url);
        setMonthSales(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }, [])

    const getCountrySales = useCallback(async () => {
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/sales/stats/countries"
        try {
        const data = await statsService.getAll(url);
        setCountrySales(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }, [])

    const getPlatformSales = useCallback(async () => {
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/sales/stats/platforms"
        try {
        const data = await statsService.getAll(url);
        setPlatformSales(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }, [])

    const getProductSales = useCallback(async () => {
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/sales/stats/products"
        try {
        const data = await statsService.getAll(url);
        setProductSales(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }, [])


    return { getMonthSales, monthSales, getCountrySales, countrySales, getPlatformSales, platformSales, getProductSales, productSales, loading, error };

};
