import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.roles,
    data: [
        {nombre: 'Ventas'},
        {nombre: 'Compras'},
        {nombre: 'RRHH'},
        {nombre: 'Auditor'}
    ]
})