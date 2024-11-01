/*
  Warnings:

  - You are about to drop the `Empleados_Historial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auditoria_Empleados` DROP FOREIGN KEY `fk_Auditoria_Empleados_Empleados_Historial1`;

-- DropForeignKey
ALTER TABLE `Empleados_Historial` DROP FOREIGN KEY `fk_Empleados_Provincias10`;

-- DropTable
DROP TABLE `Empleados_Historial`;

-- CreateTable
CREATE TABLE `Empleados_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(50) NULL,
    `telefono` VARCHAR(191) NULL,
    `dni` INTEGER NOT NULL,
    `fechaContratacion` DATE NOT NULL,
    `sueldo` DOUBLE NOT NULL,
    `Provincias_id` INTEGER NOT NULL,
    `borrado` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Empleados_Provincias1_idx`(`Provincias_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auditoria_Empleados` ADD CONSTRAINT `fk_Auditoria_Empleados_Empleados_Historial1` FOREIGN KEY (`Empleados_Historial_id`) REFERENCES `Empleados_historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Empleados_historial` ADD CONSTRAINT `fk_Empleados_Provincias10` FOREIGN KEY (`Provincias_id`) REFERENCES `Provincias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
