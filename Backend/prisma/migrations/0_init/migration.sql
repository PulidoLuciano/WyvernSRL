-- CreateTable
CREATE TABLE `Areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `nombre_UNIQUE`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria_Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `Usuarios_id` INTEGER NOT NULL,
    `Clientes_historial_id` INTEGER NOT NULL,
    `Clientes_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Auditoria_Clientes_Clientes1_idx`(`Clientes_id`),
    INDEX `fk_Auditoria_Clientes_Clientes_historial1_idx`(`Clientes_historial_id`),
    INDEX `fk_Auditoria_Empleados_Usuarios1_idx`(`Usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria_Compras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `Usuarios_id` INTEGER NOT NULL,
    `Compras_id` INTEGER NOT NULL,
    `Compras_historial_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Auditoria_Compras_Compras1_idx`(`Compras_id`),
    INDEX `fk_Auditoria_Compras_Compras_historial1_idx`(`Compras_historial_id`),
    INDEX `fk_Auditoria_Empleados_Usuarios1_idx`(`Usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria_Empleados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `Empleados_id` INTEGER NOT NULL,
    `Usuarios_id` INTEGER NOT NULL,
    `Empleados_Historial_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Auditoria_Empleados_Empleados1_idx`(`Empleados_id`),
    INDEX `fk_Auditoria_Empleados_Empleados_Historial1_idx`(`Empleados_Historial_id`),
    INDEX `fk_Auditoria_Empleados_Usuarios1_idx`(`Usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria_Proveedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `Usuarios_id` INTEGER NOT NULL,
    `Proveedores_id` INTEGER NOT NULL,
    `Proveedores_historial_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Auditoria_Empleados_Usuarios1_idx`(`Usuarios_id`),
    INDEX `fk_Auditoria_Proveedores_Proveedores1_idx`(`Proveedores_id`),
    INDEX `fk_Auditoria_Proveedores_Proveedores_historial1_idx`(`Proveedores_historial_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria_Ventas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `Usuarios_id` INTEGER NOT NULL,
    `Ventas_id` INTEGER NOT NULL,
    `Ventas_historial_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Auditoria_Empleados_Usuarios1_idx`(`Usuarios_id`),
    INDEX `fk_Auditoria_Ventas_Ventas1_idx`(`Ventas_id`),
    INDEX `fk_Auditoria_Ventas_Ventas_historial1_idx`(`Ventas_historial_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `nombre_UNIQUE`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `telefono` INTEGER NULL,
    `suscripto` TINYINT NOT NULL,
    `Paises_id` INTEGER NOT NULL,
    `Plataformas_id` INTEGER NOT NULL,

    UNIQUE INDEX `idClientes_UNIQUE`(`id`),
    INDEX `fk_Clientes_Paises1_idx`(`Paises_id`),
    INDEX `fk_Clientes_Plataformas1_idx`(`Plataformas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(32) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `telefono` INTEGER NULL,
    `suscripto` TINYINT NOT NULL,
    `Paises_id` INTEGER NOT NULL,
    `Plataformas_id` INTEGER NOT NULL,

    UNIQUE INDEX `idClientes_UNIQUE`(`id`),
    INDEX `fk_Clientes_Paises1_idx`(`Paises_id`),
    INDEX `fk_Clientes_Plataformas1_idx`(`Plataformas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(300) NOT NULL,
    `precioUnitario` DOUBLE NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaCompra` DATE NOT NULL,
    `entregado` TINYINT NOT NULL,
    `pagado` TINYINT NOT NULL,
    `Monedas_id` INTEGER NOT NULL,
    `Proveedores_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Compras_Monedas1_idx`(`Monedas_id`),
    INDEX `fk_Compras_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compras_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(300) NOT NULL,
    `precioUnitario` DOUBLE NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaCompra` DATE NOT NULL,
    `entregado` TINYINT NOT NULL,
    `pagado` TINYINT NOT NULL,
    `Monedas_id` INTEGER NOT NULL,
    `Proveedores_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Compras_Monedas1_idx`(`Monedas_id`),
    INDEX `fk_Compras_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contactos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duracion` DOUBLE NULL,
    `motivo` VARCHAR(250) NOT NULL,
    `fecha` DATETIME(0) NOT NULL,
    `Clientes_id` INTEGER NOT NULL,
    `Medios_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Contactos_Clientes1_idx`(`Clientes_id`),
    INDEX `fk_Contactos_Medios1_idx`(`Medios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contratos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaVencimiento` DATE NOT NULL,
    `fechaPago` DATE NOT NULL,
    `monto` DOUBLE NOT NULL,
    `Proveedores_id` INTEGER NOT NULL,
    `Monedas_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Contratos_Monedas1_idx`(`Monedas_id`),
    INDEX `fk_Contratos_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(50) NULL,
    `telefono` INTEGER NULL,
    `dni` INTEGER NOT NULL,
    `fechaContratacion` DATE NOT NULL,
    `sueldo` DOUBLE NOT NULL,
    `Provincias_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Empleados_Provincias1_idx`(`Provincias_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados_Historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(50) NULL,
    `telefono` INTEGER NULL,
    `dni` INTEGER NOT NULL,
    `fechaContratacion` DATE NOT NULL,
    `sueldo` DOUBLE NOT NULL,
    `Provincias_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Empleados_Provincias1_idx`(`Provincias_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados_Puestos` (
    `Empleados_id` INTEGER NOT NULL,
    `Puestos_id` INTEGER NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFinal` DATE NULL,

    INDEX `fk_Empleados_has_Puestos_Empleados1_idx`(`Empleados_id`),
    INDEX `fk_Empleados_has_Puestos_Puestos1_idx`(`Puestos_id`),
    PRIMARY KEY (`Empleados_id`, `Puestos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incumplimientos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(300) NOT NULL,
    `fecha` DATE NOT NULL,
    `Contratos_id` INTEGER NULL,
    `Compras_id` INTEGER NULL,
    `NivelDeIncumplimiento_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Incumplimientos_Compras1_idx`(`Compras_id`),
    INDEX `fk_Incumplimientos_Contratos1_idx`(`Contratos_id`),
    INDEX `fk_Incumplimientos_NivelDeIncumplimiento1_idx`(`NivelDeIncumplimiento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `idMedios_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetodosDePago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Monedas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NivelDeIncumplimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `ponderacion` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plataformas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `lanzamiento` DATE NOT NULL,
    `Categorias_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `nombre_UNIQUE`(`nombre`),
    INDEX `fk_Productos_Categorias1_idx`(`Categorias_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NULL,
    `telefono` VARCHAR(45) NULL,
    `Provincias_id` INTEGER NOT NULL,
    `Rubros_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Proveedores_Provincias1_idx`(`Provincias_id`),
    INDEX `fk_Proveedores_Rubros1_idx`(`Rubros_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedores_MetodosDePago` (
    `Proveedores_id` INTEGER NOT NULL,
    `MetodosDePago_id` INTEGER NOT NULL,
    `descripcion` VARCHAR(45) NOT NULL,

    INDEX `fk_Proveedores_has_MetodosDePago_MetodosDePago1_idx`(`MetodosDePago_id`),
    INDEX `fk_Proveedores_has_MetodosDePago_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`Proveedores_id`, `MetodosDePago_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedores_Monedas` (
    `Proveedores_id` INTEGER NOT NULL,
    `Monedas_id` INTEGER NOT NULL,

    INDEX `fk_Proveedores_has_Monedas_Monedas1_idx`(`Monedas_id`),
    INDEX `fk_Proveedores_has_Monedas_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`Proveedores_id`, `Monedas_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedores_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NULL,
    `telefono` VARCHAR(45) NULL,
    `Provincias_id` INTEGER NOT NULL,
    `Rubros_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Proveedores_Provincias1_idx`(`Provincias_id`),
    INDEX `fk_Proveedores_Rubros1_idx`(`Rubros_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `Paises_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Provincia_Paises1_idx`(`Paises_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puestos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `Areas_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `nombre_UNIQUE`(`nombre`),
    INDEX `fk_Puestos_Areas1_idx`(`Areas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `nombre_UNIQUE`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `contrasenia` VARCHAR(45) NOT NULL,
    `Empleados_id` INTEGER NOT NULL,
    `Roles_id` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_UNIQUE`(`id`),
    INDEX `fk_Usuarios_Empleados1_idx`(`Empleados_id`),
    INDEX `fk_Usuarios_Roles1_idx`(`Roles_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `Productos_id` INTEGER NOT NULL,
    `Clientes_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Ventas_Clientes1_idx`(`Clientes_id`),
    INDEX `fk_Ventas_Productos1_idx`(`Productos_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas_historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(0) NOT NULL,
    `Productos_id` INTEGER NOT NULL,
    `Clientes_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Ventas_Clientes1_idx`(`Clientes_id`),
    INDEX `fk_Ventas_Productos1_idx`(`Productos_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auditoria_Clientes` ADD CONSTRAINT `fk_Auditoria_Clientes_Clientes1` FOREIGN KEY (`Clientes_id`) REFERENCES `Clientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Clientes` ADD CONSTRAINT `fk_Auditoria_Clientes_Clientes_historial1` FOREIGN KEY (`Clientes_historial_id`) REFERENCES `Clientes_historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Clientes` ADD CONSTRAINT `fk_Auditoria_Empleados_Usuarios100` FOREIGN KEY (`Usuarios_id`) REFERENCES `Usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Compras` ADD CONSTRAINT `fk_Auditoria_Compras_Compras1` FOREIGN KEY (`Compras_id`) REFERENCES `Compras`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Compras` ADD CONSTRAINT `fk_Auditoria_Compras_Compras_historial1` FOREIGN KEY (`Compras_historial_id`) REFERENCES `Compras_historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Compras` ADD CONSTRAINT `fk_Auditoria_Empleados_Usuarios10000` FOREIGN KEY (`Usuarios_id`) REFERENCES `Usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Empleados` ADD CONSTRAINT `fk_Auditoria_Empleados_Empleados1` FOREIGN KEY (`Empleados_id`) REFERENCES `Empleados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Empleados` ADD CONSTRAINT `fk_Auditoria_Empleados_Empleados_Historial1` FOREIGN KEY (`Empleados_Historial_id`) REFERENCES `Empleados_Historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Empleados` ADD CONSTRAINT `fk_Auditoria_Empleados_Usuarios1` FOREIGN KEY (`Usuarios_id`) REFERENCES `Usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Proveedores` ADD CONSTRAINT `fk_Auditoria_Empleados_Usuarios1000` FOREIGN KEY (`Usuarios_id`) REFERENCES `Usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Proveedores` ADD CONSTRAINT `fk_Auditoria_Proveedores_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Proveedores` ADD CONSTRAINT `fk_Auditoria_Proveedores_Proveedores_historial1` FOREIGN KEY (`Proveedores_historial_id`) REFERENCES `Proveedores_historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Ventas` ADD CONSTRAINT `fk_Auditoria_Empleados_Usuarios10` FOREIGN KEY (`Usuarios_id`) REFERENCES `Usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Ventas` ADD CONSTRAINT `fk_Auditoria_Ventas_Ventas1` FOREIGN KEY (`Ventas_id`) REFERENCES `Ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Auditoria_Ventas` ADD CONSTRAINT `fk_Auditoria_Ventas_Ventas_historial1` FOREIGN KEY (`Ventas_historial_id`) REFERENCES `Ventas_historial`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `fk_Clientes_Paises1` FOREIGN KEY (`Paises_id`) REFERENCES `Paises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `fk_Clientes_Plataformas1` FOREIGN KEY (`Plataformas_id`) REFERENCES `Plataformas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Clientes_historial` ADD CONSTRAINT `fk_Clientes_Paises10` FOREIGN KEY (`Paises_id`) REFERENCES `Paises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Clientes_historial` ADD CONSTRAINT `fk_Clientes_Plataformas10` FOREIGN KEY (`Plataformas_id`) REFERENCES `Plataformas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Compras` ADD CONSTRAINT `fk_Compras_Monedas1` FOREIGN KEY (`Monedas_id`) REFERENCES `Monedas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Compras` ADD CONSTRAINT `fk_Compras_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Compras_historial` ADD CONSTRAINT `fk_Compras_Monedas10` FOREIGN KEY (`Monedas_id`) REFERENCES `Monedas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Compras_historial` ADD CONSTRAINT `fk_Compras_Proveedores10` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Contactos` ADD CONSTRAINT `fk_Contactos_Clientes1` FOREIGN KEY (`Clientes_id`) REFERENCES `Clientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Contactos` ADD CONSTRAINT `fk_Contactos_Medios1` FOREIGN KEY (`Medios_id`) REFERENCES `Medios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `fk_Contratos_Monedas1` FOREIGN KEY (`Monedas_id`) REFERENCES `Monedas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `fk_Contratos_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `fk_Empleados_Provincias1` FOREIGN KEY (`Provincias_id`) REFERENCES `Provincias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Empleados_Historial` ADD CONSTRAINT `fk_Empleados_Provincias10` FOREIGN KEY (`Provincias_id`) REFERENCES `Provincias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Empleados_Puestos` ADD CONSTRAINT `fk_Empleados_has_Puestos_Empleados1` FOREIGN KEY (`Empleados_id`) REFERENCES `Empleados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Empleados_Puestos` ADD CONSTRAINT `fk_Empleados_has_Puestos_Puestos1` FOREIGN KEY (`Puestos_id`) REFERENCES `Puestos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Incumplimientos` ADD CONSTRAINT `fk_Incumplimientos_Compras1` FOREIGN KEY (`Compras_id`) REFERENCES `Compras`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Incumplimientos` ADD CONSTRAINT `fk_Incumplimientos_Contratos1` FOREIGN KEY (`Contratos_id`) REFERENCES `Contratos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Incumplimientos` ADD CONSTRAINT `fk_Incumplimientos_NivelDeIncumplimiento1` FOREIGN KEY (`NivelDeIncumplimiento_id`) REFERENCES `NivelDeIncumplimiento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `fk_Productos_Categorias1` FOREIGN KEY (`Categorias_id`) REFERENCES `Categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores` ADD CONSTRAINT `fk_Proveedores_Provincias1` FOREIGN KEY (`Provincias_id`) REFERENCES `Provincias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores` ADD CONSTRAINT `fk_Proveedores_Rubros1` FOREIGN KEY (`Rubros_id`) REFERENCES `Rubros`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_MetodosDePago` ADD CONSTRAINT `fk_Proveedores_has_MetodosDePago_MetodosDePago1` FOREIGN KEY (`MetodosDePago_id`) REFERENCES `MetodosDePago`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_MetodosDePago` ADD CONSTRAINT `fk_Proveedores_has_MetodosDePago_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_Monedas` ADD CONSTRAINT `fk_Proveedores_has_Monedas_Monedas1` FOREIGN KEY (`Monedas_id`) REFERENCES `Monedas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_Monedas` ADD CONSTRAINT `fk_Proveedores_has_Monedas_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `Proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_historial` ADD CONSTRAINT `fk_Proveedores_Provincias10` FOREIGN KEY (`Provincias_id`) REFERENCES `Provincias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Proveedores_historial` ADD CONSTRAINT `fk_Proveedores_Rubros10` FOREIGN KEY (`Rubros_id`) REFERENCES `Rubros`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Provincias` ADD CONSTRAINT `fk_Provincia_Paises1` FOREIGN KEY (`Paises_id`) REFERENCES `Paises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Puestos` ADD CONSTRAINT `fk_Puestos_Areas1` FOREIGN KEY (`Areas_id`) REFERENCES `Areas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `fk_Usuarios_Empleados1` FOREIGN KEY (`Empleados_id`) REFERENCES `Empleados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `fk_Usuarios_Roles1` FOREIGN KEY (`Roles_id`) REFERENCES `Roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `fk_Ventas_Clientes1` FOREIGN KEY (`Clientes_id`) REFERENCES `Clientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `fk_Ventas_Productos1` FOREIGN KEY (`Productos_id`) REFERENCES `Productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas_historial` ADD CONSTRAINT `fk_Ventas_Clientes10` FOREIGN KEY (`Clientes_id`) REFERENCES `Clientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas_historial` ADD CONSTRAINT `fk_Ventas_Productos10` FOREIGN KEY (`Productos_id`) REFERENCES `Productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

