import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.nivelDeIncumplimiento,
    data: [
        {
            nombre: "Muy grave",
            ponderacion: 1
        },
        {
            nombre: "Grave",
            ponderacion: 2
        },
        {
            nombre: "Adecuado",
            ponderacion: 3
        },
        {
            nombre: "Bueno",
            ponderacion: 4
        },
        {
            nombre: "Excelente",
            ponderacion: 5
        },
    ]
})