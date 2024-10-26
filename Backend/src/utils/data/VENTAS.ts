import { PrismaClient } from "@prisma/client"
import CLIENTES from "./CLIENTES"
import CATEGORIAS from "./CATEGORIAS"

export default (prisma : PrismaClient) => ({
    dependencies: [CLIENTES, CATEGORIAS],
    schema: prisma.ventas,
    data: [
        { fecha: new Date("2023-07-17").toISOString(), Productos_id: 1, Clientes_id: 1 },
        { fecha: new Date("2023-07-18").toISOString(), Productos_id: 2, Clientes_id: 2 },
        { fecha: new Date("2023-07-19").toISOString(), Productos_id: 3, Clientes_id: 3 },
        { fecha: new Date("2023-07-20").toISOString(), Productos_id: 4, Clientes_id: 4 },
        { fecha: new Date("2023-07-21").toISOString(), Productos_id: 5, Clientes_id: 5 },
        { fecha: new Date("2023-07-22").toISOString(), Productos_id: 6, Clientes_id: 6 },
        { fecha: new Date("2023-07-23").toISOString(), Productos_id: 7, Clientes_id: 7 },
        { fecha: new Date("2023-07-24").toISOString(), Productos_id: 8, Clientes_id: 8 },
        { fecha: new Date("2023-07-25").toISOString(), Productos_id: 9, Clientes_id: 9 },
        { fecha: new Date("2023-07-26").toISOString(), Productos_id: 10, Clientes_id: 10 },
        { fecha: new Date("2023-07-27").toISOString(), Productos_id: 1, Clientes_id: 11 },
        { fecha: new Date("2023-07-28").toISOString(), Productos_id: 2, Clientes_id: 12 },
        { fecha: new Date("2023-07-29").toISOString(), Productos_id: 3, Clientes_id: 13 },
        { fecha: new Date("2023-07-30").toISOString(), Productos_id: 4, Clientes_id: 14 },
        { fecha: new Date("2023-07-31").toISOString(), Productos_id: 5, Clientes_id: 15 },
        { fecha: new Date("2023-08-01").toISOString(), Productos_id: 6, Clientes_id: 16 },
        { fecha: new Date("2023-08-02").toISOString(), Productos_id: 7, Clientes_id: 17 },
        { fecha: new Date("2023-08-03").toISOString(), Productos_id: 8, Clientes_id: 18 },
        { fecha: new Date("2023-08-04").toISOString(), Productos_id: 9, Clientes_id: 19 },
        { fecha: new Date("2023-08-05").toISOString(), Productos_id: 10, Clientes_id: 20 },
        { fecha: new Date("2023-08-06").toISOString(), Productos_id: 1, Clientes_id: 21 },
        { fecha: new Date("2023-08-07").toISOString(), Productos_id: 2, Clientes_id: 22 },
        { fecha: new Date("2023-08-08").toISOString(), Productos_id: 3, Clientes_id: 23 },
        { fecha: new Date("2023-08-09").toISOString(), Productos_id: 4, Clientes_id: 24 },
        { fecha: new Date("2023-08-10").toISOString(), Productos_id: 5, Clientes_id: 25 },
        { fecha: new Date("2023-08-11").toISOString(), Productos_id: 6, Clientes_id: 26 },
        { fecha: new Date("2023-08-12").toISOString(), Productos_id: 7, Clientes_id: 27 },
        { fecha: new Date("2023-08-13").toISOString(), Productos_id: 8, Clientes_id: 28 },
        { fecha: new Date("2023-08-14").toISOString(), Productos_id: 9, Clientes_id: 29 },
        { fecha: new Date("2023-08-15").toISOString(), Productos_id: 10, Clientes_id: 30 },
        { fecha: new Date("2023-08-16").toISOString(), Productos_id: 1, Clientes_id: 31 },
        { fecha: new Date("2023-08-17").toISOString(), Productos_id: 2, Clientes_id: 32 },
        { fecha: new Date("2023-08-18").toISOString(), Productos_id: 3, Clientes_id: 33 },
        { fecha: new Date("2023-08-19").toISOString(), Productos_id: 4, Clientes_id: 34 },
        { fecha: new Date("2023-08-20").toISOString(), Productos_id: 5, Clientes_id: 35 },
        { fecha: new Date("2023-08-21").toISOString(), Productos_id: 6, Clientes_id: 36 },
        { fecha: new Date("2023-08-22").toISOString(), Productos_id: 7, Clientes_id: 37 },
        { fecha: new Date("2023-08-23").toISOString(), Productos_id: 8, Clientes_id: 38 },
        { fecha: new Date("2023-08-24").toISOString(), Productos_id: 9, Clientes_id: 39 },
        { fecha: new Date("2023-08-25").toISOString(), Productos_id: 10, Clientes_id: 40 },
        { fecha: new Date("2023-08-26").toISOString(), Productos_id: 1, Clientes_id: 41 },
        { fecha: new Date("2023-08-27").toISOString(), Productos_id: 2, Clientes_id: 42 },
        { fecha: new Date("2023-08-28").toISOString(), Productos_id: 3, Clientes_id: 43 },
        { fecha: new Date("2023-08-29").toISOString(), Productos_id: 4, Clientes_id: 44 },
        { fecha: new Date("2023-08-30").toISOString(), Productos_id: 5, Clientes_id: 45 },
        { fecha: new Date("2023-08-31").toISOString(), Productos_id: 6, Clientes_id: 46 },
        { fecha: new Date("2023-09-01").toISOString(), Productos_id: 7, Clientes_id: 47 },
        { fecha: new Date("2023-09-02").toISOString(), Productos_id: 8, Clientes_id: 1 },
        { fecha: new Date("2023-09-03").toISOString(), Productos_id: 9, Clientes_id: 3 },
        { fecha: new Date("2023-09-04").toISOString(), Productos_id: 10, Clientes_id: 3 }
      ]
})