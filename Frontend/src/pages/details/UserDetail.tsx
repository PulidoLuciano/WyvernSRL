import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";


const UserDetail = () => {
  const params = useParams();
  const userId = parseInt(params.userId || "", 10);

  const { getUser, getAllRoles, userDetail, loading, error } = useUsers()
  
  useEffect(() => {
    getUser(userId)
  }, []);
  
  useEffect(() => {
    getAllRoles()
  }, []);
  

  if (loading) return <p>Cargando detalles del usuario...</p>;

  return (
  
      
      <main className="w-full p-3 laptop:p-2 laptop:w-2/3 laptopL:w-4/5 relative">
        {userDetail ? (
          <h1 className="text-2xl">
            Visualizacion Usuario: {userDetail.nombre}
          </h1>
        ) : (
          <h1 className="text-2xl">Visualización Usuario: ?</h1>
        )}

          <>
            <div className="grid grid-cols-2 my-6">
              <div className="col-span-2 flex gap-x-3 mb-4">
                <h2 className="text-xl">Datos del Usuario</h2>
              </div>
              {userDetail ? (
                <>
                  <h4 className="font-semibold text-lg">Nombre</h4>
                  <p>{userDetail.nombre}</p>
                  <h4 className="font-semibold text-lg">DNI</h4>
                  <p>{userDetail.Empleados?.dni}</p>
                  <h4 className="font-semibold text-lg">Rol</h4>
                  <p>{userDetail.Roles?.nombre}</p>
                </>
              ) : (
                <>
                  <p>Usuario no encontrado</p>
                  <p>{error}</p>;
                </>
              )}
            </div>
          </>

      </main>
    
  );
};

export default UserDetail;
