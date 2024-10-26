import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.metodosDePago,
    data: [
        {nombre: 'Efectivo'},
        {nombre: 'Débito'},
        {nombre: 'Crédito'},
        {nombre: 'Transferencia'},
        {nombre: 'Cheque'}
    ]
})