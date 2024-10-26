import { PrismaClient } from "@prisma/client"

export default (prisma : PrismaClient) => ({
    dependencies: [],
    schema: prisma.paises,
    data: [
      {
        "nombre": "Estados Unidos",
        "Provincias": {
          "create": [
            {"nombre": "California"},
            {"nombre": "Texas"},
            {"nombre": "Florida"},
            {"nombre": "New York"}
          ]
        }
      },
      {
        "nombre": "Argentina",
        "Provincias": {
          "create": [
            {"nombre": "Buenos Aires"},
            {"nombre": "Córdoba"},
            {"nombre": "Santa Fe"},
            {"nombre": "Mendoza"}
          ]
        }
      },
      {
        "nombre": "Brasil",
        "Provincias": {
          "create": [
            {"nombre": "São Paulo"},
            {"nombre": "Río de Janeiro"},
            {"nombre": "Bahía"},
            {"nombre": "Minas Gerais"}
          ]
        }
      },
      {
        "nombre": "Canadá",
        "Provincias": {
          "create": [
            {"nombre": "Ontario"},
            {"nombre": "Quebec"},
            {"nombre": "British Columbia"},
            {"nombre": "Alberta"}
          ]
        }
      },
      {
        "nombre": "México",
        "Provincias": {
          "create": [
            {"nombre": "Jalisco"},
            {"nombre": "Ciudad de México"},
            {"nombre": "Nuevo León"},
            {"nombre": "Puebla"}
          ]
        }
      },
      {
        "nombre": "Alemania",
        "Provincias": {
          "create": [
            {"nombre": "Baviera"},
            {"nombre": "Berlín"},
            {"nombre": "Renania del Norte-Westfalia"},
            {"nombre": "Sajonia"}
          ]
        }
      },
      {
        "nombre": "Australia",
        "Provincias": {
          "create": [
            {"nombre": "Nueva Gales del Sur"},
            {"nombre": "Victoria"},
            {"nombre": "Queensland"},
            {"nombre": "Australia Occidental"}
          ]
        }
      },
      {
        "nombre": "Francia",
        "Provincias": {
          "create": [
            {"nombre": "Île-de-France"},
            {"nombre": "Provenza-Alpes-Costa Azul"},
            {"nombre": "Auvernia-Ródano-Alpes"},
            {"nombre": "Nueva Aquitania"}
          ]
        }
      },
      {
        "nombre": "Japón",
        "Provincias": {
          "create": [
            {"nombre": "Tokio"},
            {"nombre": "Osaka"},
            {"nombre": "Kioto"},
            {"nombre": "Hokkaidō"}
          ]
        }
      },
      {
        "nombre": "Reino Unido",
        "Provincias": {
          "create": [
            {"nombre": "Inglaterra"},
            {"nombre": "Escocia"},
            {"nombre": "Gales"},
            {"nombre": "Irlanda del Norte"}
          ]
        }
      },
      {
        "nombre": "Italia",
        "Provincias": {
          "create": [
            {"nombre": "Lombardía"},
            {"nombre": "Lacio"},
            {"nombre": "Campania"},
            {"nombre": "Sicilia"}
          ]
        }
      },
      {
        "nombre": "India",
        "Provincias": {
          "create": [
            {"nombre": "Maharashtra"},
            {"nombre": "Tamil Nadu"},
            {"nombre": "Karnataka"},
            {"nombre": "Gujarat"}
          ]
        }
      },
      {
        "nombre": "China",
        "Provincias": {
          "create": [
            {"nombre": "Guangdong"},
            {"nombre": "Beijing"},
            {"nombre": "Shanghái"},
            {"nombre": "Zhejiang"}
          ]
        }
      },
      {
        "nombre": "Sudáfrica",
        "Provincias": {
          "create": [
            {"nombre": "Gauteng"},
            {"nombre": "Cabo Occidental"},
            {"nombre": "KwaZulu-Natal"},
            {"nombre": "Cabo Oriental"}
          ]
        }
      },
      {
        "nombre": "Rusia",
        "Provincias": {
          "create": [
            {"nombre": "Moscú"},
            {"nombre": "San Petersburgo"},
            {"nombre": "Siberia"},
            {"nombre": "Krasnodar"}
          ]
        }
      }
    ]    
})
