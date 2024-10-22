import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.plataformas,
    data: [
        {nombre: 'Steam'},
        {nombre: 'Epic Games'},
        {nombre: 'Itch.io'},
        {nombre: 'Microsoft Store'},
        {nombre: 'PlayStation Store'}
    ]
})