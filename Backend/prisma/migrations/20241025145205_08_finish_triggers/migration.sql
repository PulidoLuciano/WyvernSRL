 CREATE TRIGGER before_update_cliente
 AFTER UPDATE ON Clientes
 FOR EACH ROW
 BEGIN
     DECLARE action_type VARCHAR(20);
     SET action_type = IF(OLD.borrado = NEW.borrado, 'Update', 'Logic delete');
  
     -- Inserta en la tabla Clientes_historial los datos del registro actualizado
     INSERT INTO Clientes_historial(nombre, correo, telefono, suscripto, Paises_id, Plataformas_id, borrado)
     VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.suscripto, NEW.Paises_id, NEW.Plataformas_id, NEW.borrado);
  
     -- Inserta en la tabla Auditoria_Clientes el registro de la acción
     INSERT INTO Auditoria_Clientes(fecha, tipo, Usuarios_id, Clientes_historial_id, Clientes_id)
     VALUES (NOW(), action_type, @User, LAST_INSERT_ID(), NEW.id);
 END;
 CREATE TRIGGER before_create_ventas
 AFTER INSERT ON Ventas
 FOR EACH ROW
 BEGIN
     -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
     INSERT INTO Ventas_historial(fecha, Productos_id, Clientes_id, borrado)
     VALUES (NEW.fecha, NEW.Productos_id, NEW.Clientes_id, NEW.borrado);
  
     -- Inserta en la tabla auditoría el registro de la acción
     INSERT INTO Auditoria_Ventas(fecha, tipo, Usuarios_id, Ventas_historial_id, Ventas_id)
     VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
 END;
