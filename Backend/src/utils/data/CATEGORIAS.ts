import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.categorias,
    data: [
        {
            nombre: "RPG",
            Productos: {
                create: [
                    {
                    nombre: "Dragon's Legacy",
                    precio: 59.99,
                    lanzamiento: new Date("2022-11-15").toISOString()
                    },
                    {
                    nombre: "Mystic Chronicles",
                    precio: 49.99,
                    lanzamiento: new Date("2021-09-22").toISOString()
                    },
                    {
                    nombre: "Eternal Quest",
                    precio: 69.99,
                    lanzamiento: new Date("2023-06-10").toISOString()
                    }
                ]
            }
        },
        {
            nombre: "Gestión de ciudades",
            Productos: {
                create: [
                    {
                    nombre: "Shadow of Valor",
                    precio: 39.99,
                    lanzamiento: new Date("2020-03-05").toISOString()
                    },
                    {
                    nombre: "Lands of Arathorn",
                    precio: 54.99,
                    lanzamiento: new Date("2021-12-18").toISOString()
                    },
                    {
                    nombre: "Realm of Secrets",
                    precio: 59.99,
                    lanzamiento: new Date("2023-01-30").toISOString()
                    },
                    {
                    nombre: "Forgotten Kingdoms",
                    precio: 45.99,
                    lanzamiento: new Date("2020-10-01").toISOString()
                    }
                ]
            }
        },
        {
            nombre: "Estrategia por turnos",
            Productos: {
                create: [
                    {
                        nombre: "Tales of Vyndor",
                        precio: 49.99,
                        lanzamiento: new Date("2023-02-15").toISOString()
                    },
                    {
                    nombre: "Heroes of Galadorn",
                    precio: 69.99,
                    lanzamiento: new Date("2022-07-27").toISOString()
                    }
                ]
            }
        },
        {
            nombre: "Gestión de recursos",
            Productos: {
                create: [
                    {
                    nombre: "Celestial Saga",
                    precio: 59.99,
                    lanzamiento: new Date("2021-05-10").toISOString()
                    }
                ]
            }
        }
    ]
})