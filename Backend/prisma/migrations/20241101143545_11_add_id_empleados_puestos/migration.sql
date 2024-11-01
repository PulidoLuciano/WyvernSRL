/*
  Warnings:

  - The primary key for the `Empleados_Puestos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Empleados_Puestos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Empleados_Puestos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Empleados_Puestos` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `id_UNIQUE` ON `Empleados_Puestos`(`id`);
