import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.monedas,
    data: [
        {nombre: 'Dólar americano'},
        {nombre: 'Pesos argentinos'},
        {nombre: 'Euros'},
        {nombre: 'Soles'},
        {nombre: 'Reales'}
    ]
})