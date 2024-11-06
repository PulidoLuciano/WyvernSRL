import { PrismaClient } from "@prisma/client"
import AREAS from "./AREAS"

export default (prisma : PrismaClient) => ({
    dependencies: [AREAS],
    schema: prisma.empleados_Puestos,
    data: [
        { Empleados_id: 1, Puestos_id: 4, fechaInicio: new Date("2021-05-01").toISOString(), fechaFinal: null },
        { Empleados_id: 2, Puestos_id: 8, fechaInicio: new Date("2019-09-15").toISOString(), fechaFinal: null },
        { Empleados_id: 3, Puestos_id: 12, fechaInicio: new Date("2020-12-10").toISOString(), fechaFinal: null },
        { Empleados_id: 4, Puestos_id: 7, fechaInicio: new Date("2023-03-20").toISOString(), fechaFinal: null },
        { Empleados_id: 5, Puestos_id: 3, fechaInicio: new Date("2022-11-08").toISOString(), fechaFinal: null },
        { Empleados_id: 6, Puestos_id: 16, fechaInicio: new Date("2020-07-22").toISOString(), fechaFinal: null },
        { Empleados_id: 7, Puestos_id: 21, fechaInicio: new Date("2018-06-14").toISOString(), fechaFinal: null },
        { Empleados_id: 8, Puestos_id: 2, fechaInicio: new Date("2019-04-05").toISOString(), fechaFinal: null },
        { Empleados_id: 9, Puestos_id: 10, fechaInicio: new Date("2021-02-18").toISOString(), fechaFinal: null },
        { Empleados_id: 10, Puestos_id: 15, fechaInicio: new Date("2020-09-30").toISOString(), fechaFinal: null },
        { Empleados_id: 11, Puestos_id: 5, fechaInicio: new Date("2022-06-12").toISOString(), fechaFinal: null },
        { Empleados_id: 12, Puestos_id: 6, fechaInicio: new Date("2023-01-01").toISOString(), fechaFinal: null },
        { Empleados_id: 13, Puestos_id: 11, fechaInicio: new Date("2017-07-17").toISOString(), fechaFinal: null },
        { Empleados_id: 14, Puestos_id: 9, fechaInicio: new Date("2021-12-05").toISOString(), fechaFinal: null },
        { Empleados_id: 15, Puestos_id: 17, fechaInicio: new Date("2020-05-15").toISOString(), fechaFinal: null },
        { Empleados_id: 16, Puestos_id: 13, fechaInicio: new Date("2022-04-22").toISOString(), fechaFinal: null },
        { Empleados_id: 17, Puestos_id: 19, fechaInicio: new Date("2019-03-10").toISOString(), fechaFinal: null },
        { Empleados_id: 18, Puestos_id: 1, fechaInicio: new Date("2023-07-14").toISOString(), fechaFinal: null },
        { Empleados_id: 19, Puestos_id: 14, fechaInicio: new Date("2022-08-23").toISOString(), fechaFinal: null },
        { Empleados_id: 20, Puestos_id: 18, fechaInicio: new Date("2021-10-12").toISOString(), fechaFinal: null },
        { Empleados_id: 21, Puestos_id: 20, fechaInicio: new Date("2018-11-04").toISOString(), fechaFinal: null },
        { Empleados_id: 22, Puestos_id: 3, fechaInicio: new Date("2020-04-06").toISOString(), fechaFinal: null },
        { Empleados_id: 23, Puestos_id: 2, fechaInicio: new Date("2023-09-01").toISOString(), fechaFinal: null },
        { Empleados_id: 24, Puestos_id: 8, fechaInicio: new Date("2017-12-10").toISOString(), fechaFinal: null },
        { Empleados_id: 25, Puestos_id: 12, fechaInicio: new Date("2021-01-22").toISOString(), fechaFinal: null },
        { Empleados_id: 26, Puestos_id: 10, fechaInicio: new Date("2022-05-10").toISOString(), fechaFinal: null },
        { Empleados_id: 27, Puestos_id: 9, fechaInicio: new Date("2020-02-28").toISOString(), fechaFinal: null },
        { Empleados_id: 28, Puestos_id: 6, fechaInicio: new Date("2019-11-12").toISOString(), fechaFinal: null },
        { Empleados_id: 29, Puestos_id: 7, fechaInicio: new Date("2021-08-07").toISOString(), fechaFinal: null },
        { Empleados_id: 30, Puestos_id: 1, fechaInicio: new Date("2023-04-21").toISOString(), fechaFinal: null },
        { Empleados_id: 31, Puestos_id: 5, fechaInicio: new Date("2022-03-15").toISOString(), fechaFinal: null },
        { Empleados_id: 32, Puestos_id: 11, fechaInicio: new Date("2021-09-16").toISOString(), fechaFinal: null },
        { Empleados_id: 33, Puestos_id: 13, fechaInicio: new Date("2020-12-25").toISOString(), fechaFinal: null },
        { Empleados_id: 34, Puestos_id: 16, fechaInicio: new Date("2018-02-11").toISOString(), fechaFinal: null },
        { Empleados_id: 35, Puestos_id: 17, fechaInicio: new Date("2022-07-14").toISOString(), fechaFinal: null },
        { Empleados_id: 36, Puestos_id: 14, fechaInicio: new Date("2023-06-25").toISOString(), fechaFinal: null },
        { Empleados_id: 37, Puestos_id: 19, fechaInicio: new Date("2019-05-30").toISOString(), fechaFinal: null },
        { Empleados_id: 38, Puestos_id: 20, fechaInicio: new Date("2020-10-01").toISOString(), fechaFinal: null },
        { Empleados_id: 39, Puestos_id: 21, fechaInicio: new Date("2021-03-20").toISOString(), fechaFinal: null },
        { Empleados_id: 40, Puestos_id: 18, fechaInicio: new Date("2022-09-08").toISOString(), fechaFinal: null },
        { Empleados_id: 41, Puestos_id: 15, fechaInicio: new Date("2017-08-17").toISOString(), fechaFinal: null },
      
        // Additional records with date of completion (fechaFinal not null)
        { Empleados_id: 1, Puestos_id: 2, fechaInicio: new Date("2018-03-01").toISOString(), fechaFinal: new Date("2021-04-30").toISOString() },
        { Empleados_id: 5, Puestos_id: 12, fechaInicio: new Date("2019-06-08").toISOString(), fechaFinal: new Date("2022-10-10").toISOString() },
        { Empleados_id: 17, Puestos_id: 3, fechaInicio: new Date("2017-04-10").toISOString(), fechaFinal: new Date("2019-03-09").toISOString() },
        { Empleados_id: 21, Puestos_id: 7, fechaInicio: new Date("2015-11-04").toISOString(), fechaFinal: new Date("2018-11-03").toISOString() }
      ]
      
})