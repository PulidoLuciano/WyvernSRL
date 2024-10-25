-- AlterTable
ALTER TABLE `Areas` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Categorias` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Clientes` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Clientes_historial` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Compras` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Compras_historial` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Contactos` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Contratos` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Empleados` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Empleados_Historial` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Incumplimientos` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Medios` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MetodosDePago` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Monedas` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `NivelDeIncumplimiento` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Paises` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Plataformas` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Productos` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Proveedores` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Provincias` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Puestos` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Roles` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Rubros` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Usuarios` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Ventas` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Ventas_historial` ADD COLUMN `borrado` BOOLEAN NOT NULL DEFAULT false;
