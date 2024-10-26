import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.rubros,
    data: [
        {nombre: 'Hardware'},
        {nombre: 'Software'},
        {nombre: 'Cloud'},
        {nombre: 'Servicios'},
    ]
})