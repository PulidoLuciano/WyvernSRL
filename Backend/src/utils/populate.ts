import { PrismaClient } from "@prisma/client";
import EMPLEADOS_PUESTOS from "./data/EMPLEADOS_PUESTOS";
import USUARIOS from "./data/USUARIOS";
import VENTAS from "./data/VENTAS";
import CONTACTOS from "./data/CONTACTOS";
import PROVEEDORES_METODOS from "./data/PROVEEDORES_METODOS";
import PROVEEDORES_MONEDAS from "./data/PROVEEDORES_MONEDAS";
import CONTRATOS from "./data/CONTRATOS";
import COMPRAS from "./data/COMPRAS";

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
    for (let index = 0; index < ENTRY_POINTS.length; index++) {
        const element = ENTRY_POINTS[index];
        await populate(element);
    }
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })