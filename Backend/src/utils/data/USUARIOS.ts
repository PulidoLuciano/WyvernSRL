import { PrismaClient } from "@prisma/client"
import EMPLEADOS from "./EMPLEADOS"
import ROLES from "./ROLES"
import { hashSync } from "bcrypt"

export default (prisma : PrismaClient) => ({
    dependencies: [EMPLEADOS, ROLES],
    schema: prisma.usuarios,
    data: [
        {
          "nombre": "JuanPerez1",
          "contrasenia": hashSync("1234",10),
          "Empleados_id": 1,
          "Roles_id": 1
        },
        {
            "nombre": "MariaGonzalez2",
            "contrasenia": hashSync("1234",10),
            "Empleados_id": 2,
            "Roles_id": 2
        },
        {
            "nombre": "CarlosDiaz3",
            "contrasenia": hashSync("1234",10),
            "Empleados_id": 3,
            "Roles_id": 3
        },
        {
            "nombre": "LuciaFernandez4",
            "contrasenia": hashSync("1234",10),
            "Empleados_id": 4,
            "Roles_id": 4
        },
        {
            "nombre": "JorgeRamirez5",
            "contrasenia": hashSync("1234",10),
            "Empleados_id": 5,
            "Roles_id": 5
        }
    ]
      
})