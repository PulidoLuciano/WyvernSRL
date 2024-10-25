CREATE TRIGGER before_update_ventas
AFTER UPDATE ON Ventas
FOR EACH ROW
BEGIN
    DECLARE action_type VARCHAR(20);
    SET action_type = IF(OLD.borrado = NEW.borrado, 'Update', 'Logic delete');
    
    -- Inserta en la tabla Clientes_historial los datos del registro actualizado
    INSERT INTO Ventas_historial(fecha, Productos_id, Clientes_id, borrado)
    VALUES (NEW.fecha, NEW.Productos_id, NEW.Clientes_id, NEW.borrado);
    
    -- Inserta en la tabla Auditoria_Clientes el registro de la acción
    INSERT INTO Auditoria_Ventas(fecha, tipo, Usuarios_id, Ventas_historial_id, Ventas_id)
    VALUES (NOW(), action_type, @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_update_compras
AFTER UPDATE ON Compras
FOR EACH ROW
BEGIN
    DECLARE action_type VARCHAR(20);
    SET action_type = IF(OLD.borrado = NEW.borrado, 'Update', 'Logic delete');
    
    -- Inserta en la tabla Compras_historial los datos del registro actualizado
    INSERT INTO Compras_historial(descripcion, precioUnitario, cantidad, fechaCompra, entregado, pagado, Monedas_id, Proveedores_id, borrado)
    VALUES (NEW.descripcion, NEW.precioUnitario, NEW.cantidad, NEW.fechaCompra, NEW.entregado, NEW.pagado, NEW.Monedas_id, NEW.Proveedores_id, NEW.borrado);
    
    -- Inserta en la tabla Auditoria_Compras el registro de la acción
    INSERT INTO Auditoria_Compras(fecha, tipo, Usuarios_id, Compras_historial_id, Compras_id)
    VALUES (NOW(), action_type, @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_create_compras
AFTER INSERT ON Compras
FOR EACH ROW
BEGIN
    -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
    INSERT INTO Compras_historial(descripcion, precioUnitario, cantidad, fechaCompra, entregado, pagado, Monedas_id, Proveedores_id, borrado)
    VALUES (NEW.descripcion, NEW.precioUnitario, NEW.cantidad, NEW.fechaCompra, NEW.entregado, NEW.pagado, NEW.Monedas_id, NEW.Proveedores_id, NEW.borrado);
    
    -- Inserta en la tabla auditoría el registro de la acción
    INSERT INTO Auditoria_Compras(fecha, tipo, Usuarios_id, Compras_historial_id, Compras_id)
    VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_update_proveedores
AFTER UPDATE ON Proveedores
FOR EACH ROW
BEGIN
    DECLARE action_type VARCHAR(20);
    SET action_type = IF(OLD.borrado = NEW.borrado, 'Update', 'Logic delete');
    
    -- Inserta en la tabla Proveedores_historial los datos del registro actualizado
    INSERT INTO Proveedores_historial(nombre, correo, telefono, Provincias_id, Rubros_id, borrado)
    VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.Provincias_id, NEW.Rubros_id, NEW.borrado);
    
    -- Inserta en la tabla Auditoria_Proveedores el registro de la acción
    INSERT INTO Auditoria_Proveedores(fecha, tipo, Usuarios_id, Proveedores_historial_id, Proveedores_id)
    VALUES (NOW(), action_type, @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_create_proveedores
AFTER INSERT ON Proveedores
FOR EACH ROW
BEGIN
    -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
    INSERT INTO Proveedores_historial(nombre, correo, telefono, Provincias_id, Rubros_id, borrado)
    VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.Provincias_id, NEW.Rubros_id, NEW.borrado);
    
    -- Inserta en la tabla auditoría el registro de la acción
    INSERT INTO Auditoria_Proveedores(fecha, tipo, Usuarios_id, Proveedores_historial_id, Proveedores_id)
    VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_update_empleados
AFTER UPDATE ON Empleados
FOR EACH ROW
BEGIN
    DECLARE action_type VARCHAR(20);
    SET action_type = IF(OLD.borrado = NEW.borrado, 'Update', 'Logic delete');
    
    -- Inserta en la tabla Empleados_historial los datos del registro actualizado
    INSERT INTO Empleados_historial(nombre, correo, telefono, dni, fechaContratacion, sueldo, Provincias_id, borrado)
    VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.dni, NEW.fechaContratacion, NEW.sueldo, NEW.Provincias_id, NEW.borrado);
    
    -- Inserta en la tabla Auditoria_Empleados el registro de la acción
    INSERT INTO Auditoria_Empleados(fecha, tipo, Usuarios_id, Empleados_historial_id, Empleados_id)
    VALUES (NOW(), action_type, @User, LAST_INSERT_ID(), NEW.id);
END;

CREATE TRIGGER before_create_empleados
AFTER INSERT ON Empleados
FOR EACH ROW
BEGIN
    -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
    INSERT INTO Empleados_historial(nombre, correo, telefono, dni, fechaContratacion, sueldo, Provincias_id, borrado)
    VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.dni, NEW.fechaContratacion, NEW.sueldo, NEW.Provincias_id, NEW.borrado);
    
    -- Inserta en la tabla auditoría el registro de la acción
    INSERT INTO Auditoria_Empleados(fecha, tipo, Usuarios_id, Empleados_historial_id, Empleados_id)
    VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
END;