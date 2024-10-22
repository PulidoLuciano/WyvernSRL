import { PrismaClient } from "@prisma/client"
import RUBROS from "./RUBROS"

export default (prisma : PrismaClient) => ({
    dependencies: [RUBROS],
    schema: prisma.proveedores,
    data: [
        {
          nombre: 'TechNova S.A.',
          correo: 'contacto@technova.com',
          telefono: null,
          Provincias_id: 5,
          Rubros_id: 1
        },
        {
          nombre: 'SoftWareXperts',
          correo: 'info@softwarexperts.com',
          telefono: null,
          Provincias_id: 4,
          Rubros_id: 2 // Software
        },
        {
          nombre: 'Azure',
          correo: "soporte@azure.com",
          telefono: '1234567890',
          Provincias_id: 1,
          Rubros_id: 3 // Cloud
        },
        {
          nombre: 'ServiceTech Global',
          correo: 'services@servicetech.com',
          telefono: null,
          Provincias_id: 6,
          Rubros_id: 4 // Servicios
        },
        {
          nombre: 'HardSystems Ltd.',
          correo: null,
          telefono: '0987654321',
          Provincias_id: 8,
          Rubros_id: 1 // Hardware
        },
        {
          nombre: 'DevSoftware Pro',
          correo: 'support@devsoftwarepro.com',
          telefono: null,
          Provincias_id: 5,
          Rubros_id: 2 // Software
        },
        {
          nombre: 'CloudMasters',
          correo: 'admin@cloudmasters.com',
          telefono: null,
          Provincias_id: 7,
          Rubros_id: 3 // Cloud
        },
        {
          nombre: 'Fibertel',
          correo: null,
          telefono: '1122334455',
          Provincias_id: 6,
          Rubros_id: 4 // Servicios
        },
        {
          nombre: 'ComputeX',
          correo: 'sales@computex.com',
          telefono: null,
          Provincias_id: 4,
          Rubros_id: 1 // Hardware
        },
        {
          nombre: 'NextGen Software',
          correo: null,
          telefono: '2233445566',
          Provincias_id: 8,
          Rubros_id: 2 // Software
        }
      ]
})