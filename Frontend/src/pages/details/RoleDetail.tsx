import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import Pagination from '../../components/Pagination';
import Table from '../../components/table/Table';
import TData from '../../components/table/TData';
import TRow from '../../components/table/TRow';
import { usersTableHeaders } from "../../utils/dataArrays";

const RoleDetail = () => {
  const params = useParams();
  const roleId = parseInt(params.roleId || "", 10);

  const { getRole, getRoleUsers, roleUsers, roleDetail, loading, error } = useUsers()
  
  useEffect(() => {
    getRole(roleId)
  }, []);
  
  useEffect(() => {
    getRoleUsers(roleId)
  }, []);

  const [dataLength, setDataLength] = useState<number>(10);
  const [currentPageUser, setCurrentPageUser] = useState<number>(1)
  
  const indexEndUser = currentPageUser * dataLength;
  const indexStartUser = indexEndUser - dataLength;
  const nPagesUser = Math.ceil(roleUsers.length / dataLength);
  const dataShownUser = roleUsers.slice(indexStartUser, indexEndUser);

  const changePageUser = (nextPage: number) => {
    setCurrentPageUser(nextPage);
  }

  if (loading) return <p>Cargando detalles del rol...</p>;

  return (
    
      
      <main className="w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative">
        {roleDetail ? (
          <h1 className="text-2xl">
            Visualizacion Rol: {roleDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Usuario: ?</h1>
        )}

          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del Rol</h2>
              </div>
              {roleDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Id</h4>
                  <p>{roleDetail.id}</p>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{roleDetail.nombre}</p>
                </>
              ) : (
                <>
                  <p>Rol no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>

        <div className='grid grid-rows-3 gap-y-3 tablet:gap-x-2 tablet:grid-rows-1 tablet:grid-cols-4 laptop:gap-x-2 laptopL:grid-cols-6 '>
          <div className='flex gap-2 items-end tablet:col-span-2'>
            <h2>Roles</h2>
            <p>Página {currentPageUser} de {nPagesUser}</p>
          </div>

        </div>
        <div className='overflow-x-auto mt-6 '>
          <Table headers={usersTableHeaders}>
            {dataShownUser.length != 0 ?
              dataShownUser.map((u, index) => {
                return (
                  <TRow key={index} id={u.id} detail={false} deleteButton={false} path='roles'>
                    <TData>{u.nombre}</TData>
                    <TData>{u.Empleados?.dni}</TData>
                    <TData>{u.Roles?.nombre}</TData>
                  </TRow>)
              })
              : <div className=''>No hay roles con esas caracteristicas</div>

            }
          </Table>
        </div>
        <div className='flex items-center justify-center laptop:justify-end gap-6 my-6' id='paginacionTabla'>
          <Pagination changePage={changePageUser} nPages={nPagesUser} currentPage={currentPageUser} indexStart={indexStartUser} indexEnd={indexEndUser} />
        </div>

      </main>
   
  );
};

export default RoleDetail;
