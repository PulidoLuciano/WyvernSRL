import { PrismaClient } from "@prisma/client"
import MONEDAS from "./MONEDAS"

export default (prisma : PrismaClient) => ({
    dependencies: [MONEDAS],
    schema: prisma.proveedores_Monedas,
    data: [
        { Proveedores_id: 1, Monedas_id: 3 },
        { Proveedores_id: 1, Monedas_id: 5 },
        { Proveedores_id: 2, Monedas_id: 1 },
        { Proveedores_id: 2, Monedas_id: 4 },
        { Proveedores_id: 3, Monedas_id: 2 },
        { Proveedores_id: 3, Monedas_id: 5 },
        { Proveedores_id: 4, Monedas_id: 3 },
        { Proveedores_id: 4, Monedas_id: 1 },
        { Proveedores_id: 5, Monedas_id: 4 },
        { Proveedores_id: 5, Monedas_id: 2 },
        { Proveedores_id: 6, Monedas_id: 3 },
        { Proveedores_id: 6, Monedas_id: 5 },
        { Proveedores_id: 7, Monedas_id: 1 },
        { Proveedores_id: 7, Monedas_id: 4 },
        { Proveedores_id: 8, Monedas_id: 2 },
        { Proveedores_id: 8, Monedas_id: 3 },
        { Proveedores_id: 9, Monedas_id: 5 },
        { Proveedores_id: 9, Monedas_id: 1 },
        { Proveedores_id: 10, Monedas_id: 4 },
        { Proveedores_id: 10, Monedas_id: 2 }
      ]
})