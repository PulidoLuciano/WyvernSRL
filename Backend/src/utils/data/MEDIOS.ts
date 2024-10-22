import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.medios,
    data: [
        {nombre: "Telefono"},
        {nombre: "Foro"},
        {nombre: "E-mail"},
    ]
})