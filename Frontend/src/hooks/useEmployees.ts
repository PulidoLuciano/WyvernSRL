import { useState, useCallback } from "react";
import { employeesService } from "../service/employeesService";
import { employeeType } from "../utils/types/employeeType";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [employeeDetail, setEmployeeDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletes, setDeletes] = useState<Array<any> | null>(null);

  const getAllEmployees = useCallback(
    async (states?: boolean, filterUrl?: string) => {
      setLoading(true);
      setError(null);

      let filterUrlLast;
      filterUrl
        ? (filterUrlLast = filterUrl.replace("?", "&"))
        : (filterUrlLast = "");

    let url = "http://localhost:3000/employees/";  
    let includesStatements = "?include=id&include=nombre&include=correo&include=telefono&include=dni&include=fechaContratacion&include=sueldo&borrado=false"
    let includeState = "?include=id&include=nombre&include=correo&include=telefono&include=dni&include=fechaContratacion&include=sueldo&include=Provincias&borrado=false";
    try {
        if ( states ) {
          filterUrl
            ? (url = url.concat(includesStatements, filterUrlLast,"&include=Plataformas&include=Paises"))
            : (url = url.concat(includeState));
        } else {
          if (filterUrl) url = url.concat(filterUrl);
        }

        const data = await employeesService.getAllEmployees(url);

        setEmployees(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createEmployee = async (clientData: employeeType) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/employees";
    try {
      await employeesService.createEmployee(url, clientData);
      await getAllEmployees(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (ids: Array<any>) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/employees/";
    try {
      const response = await employeesService.deleteEmployee(url, ids);
      await getAllEmployees(true);
      console.log(await response);
      return response;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEmployee = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    let url = `http://localhost:3000/clients/${id}/?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&include=Paises&borrado=false`;
    try {
      const data = await employeesService.getOne(url);
      setEmployeeDetail(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const updateEmployee = async(id:number,supplierData:employeeType)=>{
    setLoading(true)
    setError(null)
     try {
     await employeesService.updateEmployee(id,supplierData);
     await getEmployee(id);
    } catch (err : any) {
     setError(err.message)
    }finally{
     setLoading(false)
    }

 }

  return { getAllEmployees,employees, createEmployee, updateEmployee, deleteEmployee, loading, error };
};
