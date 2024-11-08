import { useState, useCallback } from 'react';
import { areaType } from '../utils/types/areaType';
import { userService } from "../service/userService";
import { userType } from '../utils/types/userTypes';

export const useUsers = () => {

    const [users, setUsers] = useState<Array<any>>([]);
    const [roles, setRoles] = useState<Array<any>>([]);
    const [roleUsers, setRoleUsers] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [roleDetail, setRoleDetail] = useState<any>([]);

    const getAllUsers = useCallback(
        async ( roles?: boolean, empleados?: boolean, filterUrl?: string) => {
          setLoading(true);
          setError(null);
    
          let filterUrlLast;
          filterUrl
            ? (filterUrlLast = filterUrl.replace("?", "&"))
            : (filterUrlLast = "");
    
        let url = "http://localhost:3000/users/";  
        let includesStatements = "?include=id&include=nombre&borrado=false"
        let includeRolesEmployees = "?include=id&include=nombre&borrado=false&include=Empleados&include=Roles";
        let includeRoles = "?include=id&include=nombre&borrado=false&include=Roles";
        let includeEmployees = "?include=id&include=nombre&borrado=false&include=Empleados";
          try {
  
            if (roles && empleados) {
              filterUrl
                ? (url = url.concat(includesStatements, filterUrlLast,"&include=Roles&include=Empleados"))
                : (url = url.concat(includeRolesEmployees));
            } else if (roles) {
              filterUrl
                ? (url = url.concat(includesStatements, filterUrlLast,"&include=Roles"))
                : (url = url.concat(includeRoles));
            } else if (empleados) {
              filterUrl
                ? (url = url.concat(includesStatements, filterUrlLast,"&include=Empleados"))
                : (url = url.concat(includeEmployees));
            } else {
              if (filterUrl) url = url.concat(filterUrl);
            }
            const data = await userService.getAll(url);
            
            setUsers(data);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        []
      );


    const getAllRoles = useCallback(async()=>{
        setLoading(true);
        setError(null)
        let url = "http://localhost:3000/roles/?include=id&include=nombre&borrado=false"
        try {
        const data = await userService.getAll(url);
        setRoles(data)
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    },[])

    const getUser = useCallback(async (id: number) => {
      setLoading(true);
      setError(null);
      let url = `http://localhost:3000/users/${id}/?include=id&include=nombre&include=Empleados&include=Roles`;
      try {
        const data = await userService.getOne(url);
        setUserDetail(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, []);

    const getRole = useCallback(async (id: number) => {
      setLoading(true);
      setError(null);
      let url = `http://localhost:3000/roles/${id}/?include=id&include=nombre`;
      try {
        const data = await userService.getOne(url);
        setRoleDetail(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, []);


    const getRoleUsers = async( id: number)=>{
      setLoading(true);
      setError(null)
      let url = `http://localhost:3000/users/?Roles_id=${id}&include=Empleados&include=Roles&include=nombre&include=id&borrado=false`
      try {
      const data = await userService.getAll(url);
      setRoleUsers(data)
      } catch (err: any) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
  }
    
  const createUser = async (userData: userType) => {
    setLoading(true);
    setError(null);
    try {
      await userService.createUser(userData);
      await getAllUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


    
    return { getAllUsers, users, getAllRoles, roles, createUser, getUser, getRole, roleDetail, userDetail,roleUsers,getRoleUsers, loading, error };
}

