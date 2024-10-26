import { PrismaClient } from "@prisma/client"
import NIVELINCUMPLIMIENTO from "./NIVELINCUMPLIMIENTO"

export default (prisma : PrismaClient) => ({
    dependencies: [NIVELINCUMPLIMIENTO],
    schema: prisma.contratos,
    data: [
        {
            fechaVencimiento: new Date("2025-04-18").toISOString(),
            fechaPago: new Date("2024-10-25").toISOString(),
            monto: 145000,
            Proveedores_id: 3,
            Monedas_id: 1,
            Incumplimientos: {
                create: [{
                    descripcion: "No se ha cumplido con el nivel de servicio acordado en un 3%.",
                    fecha: new Date("2024-09-17").toISOString(),
                    NivelDeIncumplimiento_id: 1
                }]
            },
            descripcion: "Contrato de suministro de servidores y almacenamiento en la nube."
        },
        {
            fechaVencimiento: new Date("2025-05-20").toISOString(),
            fechaPago: new Date("2024-11-30").toISOString(),
            monto: 95000,
            Proveedores_id: 4,
            Monedas_id: 2,
            Incumplimientos: {
                create: [{
                    descripcion: "El proveedor ha incumplido con el contrato en un 2%.",
                    fecha: new Date("2024-10-01").toISOString(),
                    NivelDeIncumplimiento_id: 2
                }]
            },
            descripcion: "Contrato de prestación de servicios de mantenimiento de hardware, abarcando reparaciones y reemplazos de equipos."
        },
        {
            fechaVencimiento: new Date("2025-07-30").toISOString(),
            fechaPago: new Date("2024-11-20").toISOString(),
            monto: 120000,
            Proveedores_id: 7,
            Monedas_id: 3,
            Incumplimientos: {
                create: [{
                    descripcion: "El servicio ha sido adecuado, pero con algunas fallas menores.",
                    fecha: new Date("2024-10-05").toISOString(),
                    NivelDeIncumplimiento_id: 3
                }]
            },
            descripcion: "Contrato de servicios en la nube para almacenamiento y gestión de datos, que incluye respaldo y recuperación de información."
        },
        {
            fechaVencimiento: new Date("2025-06-15").toISOString(),
            fechaPago: new Date("2024-12-15").toISOString(),
            monto: 78000,
            Proveedores_id: 8,
            Monedas_id: 4,
            Incumplimientos: {
                create: [{
                    descripcion: "El proveedor ha mostrado una excelente capacidad de cumplimiento.",
                    fecha: new Date("2024-09-30").toISOString(),
                    NivelDeIncumplimiento_id: 5
                }]
            },
            descripcion: "Servicio de acceso a internet de 300Mbs para las oficinas de la empresa."
        }
    ]
})