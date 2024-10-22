import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.compras,
    data: [
        {
            descripcion: "Compra de placas madre para estaciones de trabajo.",
            cantidad: 5,
            precioUnitario: 145000,
            fechaCompra: new Date("2024-05-25").toISOString(),
            entregado: false,
            pagado: true,
            Monedas_id: 1,
            Proveedores_id: 1,
            Incumplimientos: {
                create: [{
                    descripcion: "Los productos no llegaron a tiempo.",
                    fecha: new Date("2024-09-17").toISOString(),
                    NivelDeIncumplimiento_id: 1
                }]
            }
        },
        {
            descripcion: "Compra de servidores para el centro de datos.",
            cantidad: 3,
            precioUnitario: 320000,
            fechaCompra: new Date("2024-06-10").toISOString(),
            entregado: true,
            pagado: false,
            Monedas_id: 2,
            Proveedores_id: 1,
            Incumplimientos: {
                create: [{
                    descripcion: "El equipo llegó dañado en el envío.",
                    fecha: new Date("2024-07-20").toISOString(),
                    NivelDeIncumplimiento_id: 2
                }]
            }
        },
        {
            descripcion: "Compra de licencias de software para gestión de proyectos.",
            cantidad: 10,
            precioUnitario: 25000,
            fechaCompra: new Date("2024-04-15").toISOString(),
            entregado: true,
            pagado: true,
            Monedas_id: 3,
            Proveedores_id: 6,
            Incumplimientos: {
                create: [{
                    descripcion: "El software no cumplió con las especificaciones técnicas acordadas.",
                    fecha: new Date("2024-05-10").toISOString(),
                    NivelDeIncumplimiento_id: 1
                }]
            }
        },
        {
            descripcion: "Compra de equipos de red (switches y routers).",
            cantidad: 7,
            precioUnitario: 85000,
            fechaCompra: new Date("2024-07-01").toISOString(),
            entregado: false,
            pagado: false,
            Monedas_id: 4,
            Proveedores_id: 5,
            Incumplimientos: {
                create: [{
                    descripcion: "El proveedor entregó menos equipos de los acordados.",
                    fecha: new Date("2024-08-15").toISOString(),
                    NivelDeIncumplimiento_id: 3
                }]
            }
        }
    ]
})