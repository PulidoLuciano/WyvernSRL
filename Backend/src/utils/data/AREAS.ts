import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.areas,
    data: [
        {
          "nombre": "Ventas",
          "Puestos": {
            "create": [
              {"nombre": "Gerente de Ventas"},
              {"nombre": "Vendedor"},
              {"nombre": "Analista de Ventas"}
            ]
          }
        },
        {
          "nombre": "Desarrollo",
          "Puestos": {
            "create": [
              {"nombre": "Desarrollador Backend"},
              {"nombre": "Desarrollador Frontend"},
              {"nombre": "Tester QA"}
            ]
          }
        },
        {
          "nombre": "Marketing",
          "Puestos": {
            "create": [
              {"nombre": "Gerente de Marketing"},
              {"nombre": "Especialista en Redes Sociales"},
              {"nombre": "Analista de Mercado"}
            ]
          }
        },
        {
          "nombre": "Recursos Humanos",
          "Puestos": {
            "create": [
              {"nombre": "Gerente de Recursos Humanos"},
              {"nombre": "Reclutador"},
              {"nombre": "Especialista en Capacitación"}
            ]
          }
        },
        {
          "nombre": "Producción",
          "Puestos": {
            "create": [
              {"nombre": "Productor de Videojuegos"},
              {"nombre": "Diseñador de Niveles"},
              {"nombre": "Animador 3D"}
            ]
          }
        },
        {
          "nombre": "Soporte Técnico",
          "Puestos": {
            "create": [
              {"nombre": "Gerente de Soporte Técnico"},
              {"nombre": "Técnico de Soporte"},
              {"nombre": "Especialista en Solución de Problemas"}
            ]
          }
        },
        {
          "nombre": "Compras",
          "Puestos": {
            "create": [
              {"nombre": "Gerente de Compras"},
              {"nombre": "Analista de Compras"},
              {"nombre": "Coordinador de Proveedores"}
            ]
          }
        }
      ]          
})