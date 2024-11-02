import { PrismaClient } from "@prisma/client";
import EMPLEADOS_PUESTOS from "./data/EMPLEADOS_PUESTOS";
import USUARIOS from "./data/USUARIOS";
import VENTAS from "./data/VENTAS";
import CONTACTOS from "./data/CONTACTOS";
import PROVEEDORES_METODOS from "./data/PROVEEDORES_METODOS";
import PROVEEDORES_MONEDAS from "./data/PROVEEDORES_MONEDAS";
import CONTRATOS from "./data/CONTRATOS";
import COMPRAS from "./data/COMPRAS";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient()

export type PopulateData = (prisma : PrismaClient) => { dependencies: Array<PopulateData> | [], schema: any, data: any}

const ENTRY_POINTS : Array<PopulateData> = [
    USUARIOS, //EMPLEADOS, PAISES, PROVINCIAS, ROLES
    EMPLEADOS_PUESTOS, //PUESTOS, AREAS
    VENTAS, //CLIENTES, PRODUCTOS, CATEGORIAS, PLATAFORMAS
    CONTACTOS, //MEDIOS
    PROVEEDORES_METODOS, //PROVEEDORES, METODOS, RUBROS
    PROVEEDORES_MONEDAS, // MONEDAS
    CONTRATOS, // NIVELINCUMPLIMIENTO
    COMPRAS
]

async function populate(tabla : PopulateData) {
    const dependencies = tabla(prisma).dependencies
    for (let index = 0; index < dependencies.length; index++) {
        const element = dependencies[index];
        await populate(element);
    }
    const data = tabla(prisma).data
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        await tabla(prisma).schema.create({data: element})
    }

    const test = await tabla(prisma).schema.findMany();
    console.log(test)
}

async function main(){
    await prisma.$queryRaw`DROP TRIGGER [IF EXISTS] before_create_empleados;`
    prisma.paises.create({data: {nombre: "Bhutan"}});
    prisma.provincias.create({data: {nombre: "Juanlandia", Paises_id: 1}});
    prisma.empleados.create({data:{ 
        nombre: "Juan Manuel Lopez Asis", 
        correo: "juancitoLopez@wyvern.com",
        telefono: null,
        dni: 431039123,
        fechaContratacion: new Date(Date.now()).toISOString(),
        sueldo: 4000,
        Provincias_id: 1
    }});
    prisma.roles.create({data: {
        nombre: "Admin"
    }})
    prisma.usuarios.create({ data: {
        nombre: "JuanLopezAsis",
        contrasenia: hashSync("1234",10),
        Empleados_id: 1,
        Roles_id: 1
    }})
    await prisma.$queryRaw`SET @User = 1`
    for (let index = 0; index < ENTRY_POINTS.length; index++) {
        const element = ENTRY_POINTS[index];
        await populate(element);
    }
    await prisma.$queryRaw`CREATE TRIGGER before_create_empleados
    AFTER INSERT ON Empleados
    FOR EACH ROW
    BEGIN
        -- Inserta en la tabla historial_empleado los datos del cliente que será modificado
        INSERT INTO Empleados_historial(nombre, correo, telefono, dni, fechaContratacion, sueldo, Provincias_id, borrado)
        VALUES (NEW.nombre, NEW.correo, NEW.telefono, NEW.dni, NEW.fechaContratacion, NEW.sueldo, NEW.Provincias_id, NEW.borrado);
        
        -- Inserta en la tabla auditoría el registro de la acción
        INSERT INTO Auditoria_Empleados(fecha, tipo, Usuarios_id, Empleados_historial_id, Empleados_id)
        VALUES (NOW(), 'Crear', @User, LAST_INSERT_ID(), NEW.id);
    END;`
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })