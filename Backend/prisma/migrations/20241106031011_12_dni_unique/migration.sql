/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Empleados` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Empleados_dni_key` ON `Empleados`(`dni`);
