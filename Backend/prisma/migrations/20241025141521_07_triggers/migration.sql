 CREATE TRIGGER before_create_cliente
 AFTER INSERT ON Clientes
 FOR EACH ROW
 BEGIN
     -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
     INSERT INTO Clientes_historial(nombre, correo, telefono, suscripto, Paises_id, Plataformas_id, borrado)
     VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.suscripto, NEW.Paises_id, NEW.Plataformas_id, NEW.borrado);
    
     -- Inserta en la tabla auditoría el registro de la acción
     INSERT INTO Auditoria_Clientes(fecha, tipo, Usuarios_id, Clientes_historial_id, Clientes_id)
     VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
 END
