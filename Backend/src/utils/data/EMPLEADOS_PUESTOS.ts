import { PrismaClient } from "@prisma/client"
import AREAS from "./AREAS"

export default (prisma : PrismaClient) => ({
    dependencies: [AREAS],
    schema: prisma.empleados_Puestos,
    data: [
        {
          "Empleados_id": 1,
          "Puestos_id": 4,
          "fechaInicio": new Date("2020-01-15").toISOString(),
          "fechaFinal": null
        },
        {
            "Empleados_id": 2,
            "Puestos_id": 1,
            "fechaInicio": new Date("2020-01-15").toISOString(),
            "fechaFinal": null
        },
        {
            "Empleados_id": 3,
            "Puestos_id": 19,
            "fechaInicio": new Date("2020-01-15").toISOString(),
            "fechaFinal": null
        },
        {
            "Empleados_id": 4,
            "Puestos_id": 10,
            "fechaInicio": new Date("2020-01-15").toISOString(),
            "fechaFinal": null
        },
        {
            "Empleados_id": 5,
            "Puestos_id": 6,
            "fechaInicio": new Date("2020-01-15").toISOString(),
            "fechaFinal": null
        },
    ]
      
})