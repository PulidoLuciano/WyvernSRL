import { PrismaClient } from "@prisma/client"
import PAISES from "./PAISES"

export default (prisma : PrismaClient) => ({
    dependencies: [PAISES],
    schema: prisma.empleados,
    data: [
        {
          "nombre": "Juan Pérez",
          "correo": "juan.perez@wyvern.com",
          "telefono": "+54 9 11 1234-5678",
          "dni": 3012345,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 55000,
          "Provincias_id": 1
        },
        {
          "nombre": "María González",
          "correo": "maria.gonzalez@wyvern.com",
          "telefono": "+54 9 11 2345-6789",
          "dni": 31123457,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id":  2
        },
        {
          "nombre": "Carlos Díaz",
          "correo": "carlos.diaz@wyvern.com",
          "telefono": "+54 9 11 3456-7890",
          "dni": 32123458,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 58000,
          "Provincias_id":  3
        },
        {
          "nombre": "Lucía Fernández",
          "correo": "lucia.fernandez@wyvern.com",
          "telefono": "+54 9 11 4567-8901",
          "dni": 33123459,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id":  4
        },
        {
          "nombre": "Jorge Ramírez",
          "correo": "jorge.ramirez@wyvern.com",
          "telefono": "+54 9 11 5678-9012",
          "dni": 34123460,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 65000,
          "Provincias_id":  5
        },
        {
          "nombre": "Sofía López",
          "correo": "sofia.lopez@wyvern.com",
          "telefono": "+54 9 11 6789-0123",
          "dni": 35123461,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 57000,
          "Provincias_id":  6
        },
        {
          "nombre": "Pablo Castro",
          "correo": "pablo.castro@wyvern.com",
          "telefono": "+54 9 11 7890-1234",
          "dni": 36123462,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 61000,
          "Provincias_id":  7
        },
        {
          "nombre": "Ana Morales",
          "correo": "ana.morales@wyvern.com",
          "telefono": "+54 9 11 8901-2345",
          "dni": 37123463,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 63000,
          "Provincias_id":  8
        },
        {
          "nombre": "Federico Álvarez",
          "correo": "federico.alvarez@wyvern.com",
          "telefono": "+54 9 11 9012-3456",
          "dni": 38123464,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 59000,
          "Provincias_id":  6
        },
        {
          "nombre": "Verónica Rojas",
          "correo": "veronica.rojas@wyvern.com",
          "telefono": "+54 9 11 0123-4567",
          "dni": 39123465,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id": 9
        },
        {
          "nombre": "Guillermo Torres",
          "correo": "guillermo.torres@wyvern.com",
          "telefono": "+54 9 11 1234-5678",
          "dni": 40123466,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 61000,
          "Provincias_id": 10
        },
        {
          "nombre": "Cecilia Vargas",
          "correo": "cecilia.vargas@wyvern.com",
          "telefono": "+54 9 11 2345-6789",
          "dni": 41123467,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 64000,
          "Provincias_id": 5
        },
        {
          "nombre": "Rodrigo Peña",
          "correo": "rodrigo.pena@wyvern.com",
          "telefono": "+54 9 11 3456-7890",
          "dni": 42123468,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 58000,
          "Provincias_id": 3
        },
        {
          "nombre": "Gabriela Ruiz",
          "correo": "gabriela.ruiz@wyvern.com",
          "telefono": "+54 9 11 4567-8901",
          "dni": 43123469,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 10
        },
        {
          "nombre": "Sebastián Herrera",
          "correo": "sebastian.herrera@wyvern.com",
          "telefono": "+54 9 11 5678-9012",
          "dni": 44123470,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 66000,
          "Provincias_id": 23
        },
        {
          "nombre": "Valeria Medina",
          "correo": "valeria.medina@wyvern.com",
          "telefono": "+54 9 11 6789-0123",
          "dni": 45123471,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 59000,
          "Provincias_id": 13
        },
        {
          "nombre": "Joaquín Navarro",
          "correo": "joaquin.navarro@wyvern.com",
          "telefono": "+54 9 11 7890-1234",
          "dni": 46123472,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 1
        },
        {
          "nombre": "Florencia Sánchez",
          "correo": "florencia.sanchez@wyvern.com",
          "telefono": "+54 9 11 8901-2345",
          "dni": 47123473,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id": 20
        },
        {
          "nombre": "Matías Benítez",
          "correo": "matias.benitez@wyvern.com",
          "telefono": "+54 9 11 0123-4567",
          "dni": 48123474,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 64000,
          "Provincias_id": 6
        },
        {
          "nombre": "Elena Castillo",
          "correo": "elena.castillo@wyvern.com",
          "telefono": "+54 9 11 1234-5678",
          "dni": 49123475,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 57000,
          "Provincias_id": 20
        },
        {
          "nombre": "Manuel Vega",
          "correo": "manuel.vega@wyvern.com",
          "telefono": "+54 9 11 2345-6789",
          "dni": 50123476,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 61000,
          "Provincias_id": 17
        },
        {
          "nombre": "Laura Romero",
          "correo": "laura.romero@wyvern.com",
          "telefono": "+54 9 11 3456-7890",
          "dni": 51123477,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 63000,
          "Provincias_id": 15
        },
        {
          "nombre": "Nicolás Ortiz",
          "correo": "nicolas.ortiz@wyvern.com",
          "telefono": "+54 9 11 4567-8901",
          "dni": 52123478,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 65000,
          "Provincias_id": 18
        },
        {
          "nombre": "Camila Cabrera",
          "correo": "camila.cabrera@wyvern.com",
          "telefono": "+54 9 11 5678-9012",
          "dni": 53123479,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 19
        },
        {
          "nombre": "Santiago Correa",
          "correo": "santiago.correa@wyvern.com",
          "telefono": "+54 9 11 6789-0123",
          "dni": 54123480,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 59000,
          "Provincias_id": 25
        },
        {
          "nombre": "Alicia Mendoza",
          "correo": "alicia.mendoza@wyvern.com",
          "telefono": "+54 9 11 7890-1234",
          "dni": 55123481,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 61000,
          "Provincias_id": 24
        },
        {
          "nombre": "Alejandro Pérez",
          "correo": "alejandro.perez@wyvern.com",
          "telefono": "+54 9 11 8901-2345",
          "dni": 56123482,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 58000,
          "Provincias_id": 4
        },
        {
          "nombre": "Patricia Vargas",
          "correo": "patricia.vargas@wyvern.com",
          "telefono": "+54 9 11 0123-4567",
          "dni": 57123483,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id": 5
        },
        {
          "nombre": "Martín Reyes",
          "correo": "martin.reyes@wyvern.com",
          "telefono": "+54 9 11 1234-5678",
          "dni": 58123484,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 64000,
          "Provincias_id": 30
        },
        {
          "nombre": "Carolina Aguirre",
          "correo": "carolina.aguirre@wyvern.com",
          "telefono": "+54 9 11 2345-6789",
          "dni": 59123485,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 20
        },
        {
          "nombre": "Lucas Flores",
          "correo": "lucas.flores@wyvern.com",
          "telefono": "+54 9 11 3456-7890",
          "dni": 60123486,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 61000,
          "Provincias_id": 10
        },
        {
          "nombre": "Claudia Molina",
          "correo": "claudia.molina@wyvern.com",
          "telefono": "+54 9 11 4567-8901",
          "dni": 61123487,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 65000,
          "Provincias_id": 9
        },
        {
          "nombre": "Esteban Paredes",
          "correo": "esteban.paredes@wyvern.com",
          "telefono": "+54 9 11 5678-9012",
          "dni": 62123488,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id": 30
        },
        {
          "nombre": "Mónica Campos",
          "correo": "monica.campos@wyvern.com",
          "telefono": "+54 9 11 6789-0123",
          "dni": 63123489,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 26
        },
        {
          "nombre": "Fernando Sosa",
          "correo": "fernando.sosa@wyvern.com",
          "telefono": "+54 9 11 7890-1234",
          "dni": 64123490,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 59000,
          "Provincias_id": 5
        },
        {
          "nombre": "Liliana Gutiérrez",
          "correo": "liliana.gutierrez@wyvern.com",
          "telefono": "+54 9 11 8901-2345",
          "dni": 65123491,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 65000,
          "Provincias_id": 3
        },
        {
          "nombre": "Felipe Andrade",
          "correo": "felipe.andrade@wyvern.com",
          "telefono": "+54 9 11 0123-4567",
          "dni": 66123492,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 8
        },
        {
          "nombre": "Natalia Espinoza",
          "correo": "natalia.espinoza@wyvern.com",
          "telefono": "+54 9 11 1234-5678",
          "dni": 67123493,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 62000,
          "Provincias_id": 9
        },
        {
          "nombre": "Rafael Muñoz",
          "correo": "rafael.munoz@wyvern.com",
          "telefono": "+54 9 11 2345-6789",
          "dni": 68123494,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 64000,
          "Provincias_id": 9
        },
        {
          "nombre": "Marcela Ortiz",
          "correo": "marcela.ortiz@wyvern.com",
          "telefono": "+54 9 11 3456-7890",
          "dni": 69123495,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 59000,
          "Provincias_id": 9
        },
        {
          "nombre": "Damián Serrano",
          "correo": "damian.serrano@wyvern.com",
          "telefono": "+54 9 11 4567-8901",
          "dni": 70123496,
          "fechaContratacion": new Date("2020-01-15").toISOString(),
          "sueldo": 60000,
          "Provincias_id": 9
        }
    ]
      
})