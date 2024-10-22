import { PrismaClient } from "@prisma/client"
import MEDIOS from "./MEDIOS"

export default (prisma : PrismaClient) => ({
    dependencies: [MEDIOS],
    schema: prisma.contactos,
    data: [
        { duracion: 240.5, motivo: "Problema con la instalación del juego", fecha: new Date("2023-04-19"), Clientes_id: 3, Medios_id: 1 },
        { duracion: null, motivo: "Pregunta sobre el contenido adicional", fecha: new Date("2023-04-20"), Clientes_id: 12, Medios_id: 2 },
        { duracion: 180.2, motivo: "Error de conexión con los servidores", fecha: new Date("2023-04-21"), Clientes_id: 9, Medios_id: 1 },
        { duracion: null, motivo: "El juego no reconoce los controladores", fecha: new Date("2023-04-22"), Clientes_id: 18, Medios_id: 3 },
        { duracion: 300.1, motivo: "Se cierra el juego sin razón aparente", fecha: new Date("2023-04-23"), Clientes_id: 4, Medios_id: 1 },
        { duracion: null, motivo: "Consulta sobre las reglas del foro", fecha: new Date("2023-04-24"), Clientes_id: 25, Medios_id: 2 },
        { duracion: 155.6, motivo: "Problemas con la actualización", fecha: new Date("2023-04-25"), Clientes_id: 15, Medios_id: 1 },
        { duracion: null, motivo: "No recibe correos de confirmación", fecha: new Date("2023-04-26"), Clientes_id: 22, Medios_id: 3 },
        { duracion: 210.8, motivo: "Interrupciones durante la partida", fecha: new Date("2023-04-27"), Clientes_id: 5, Medios_id: 1 },
        { duracion: null, motivo: "Solicitud de reembolso", fecha: new Date("2023-04-28"), Clientes_id: 10, Medios_id: 2 },
        { duracion: null, motivo: "No puede acceder al foro", fecha: new Date("2023-04-29"), Clientes_id: 30, Medios_id: 2 },
        { duracion: 195.4, motivo: "Pantalla en negro al iniciar el juego", fecha: new Date("2023-04-30"), Clientes_id: 19, Medios_id: 1 },
        { duracion: null, motivo: "Olvidó su contraseña de la cuenta", fecha: new Date("2023-05-01"), Clientes_id: 8, Medios_id: 3 },
        { duracion: 275.3, motivo: "Caídas del servidor durante el juego", fecha: new Date("2023-05-02"), Clientes_id: 7, Medios_id: 1 },
        { duracion: null, motivo: "El juego no actualiza las estadísticas", fecha: new Date("2023-05-03"), Clientes_id: 23, Medios_id: 3 },
        { duracion: 190.7, motivo: "Problemas de latencia en multijugador", fecha: new Date("2023-05-04"), Clientes_id: 13, Medios_id: 1 },
        { duracion: null, motivo: "Consulta sobre el sistema de soporte", fecha: new Date("2023-05-05"), Clientes_id: 27, Medios_id: 2 },
        { duracion: 220.9, motivo: "Error de autenticación al iniciar sesión", fecha: new Date("2023-05-06"), Clientes_id: 2, Medios_id: 1 },
        { duracion: null, motivo: "El juego no reconoce su cuenta premium", fecha: new Date("2023-05-07"), Clientes_id: 11, Medios_id: 3 },
        { duracion: null, motivo: "Desaparecen items del inventario", fecha: new Date("2023-05-08"), Clientes_id: 14, Medios_id: 2 },
        { duracion: 260.4, motivo: "Fallas con el sistema de recompensas", fecha: new Date("2023-05-09"), Clientes_id: 6, Medios_id: 1 },
        { duracion: null, motivo: "Error en el cálculo de logros", fecha: new Date("2023-05-10"), Clientes_id: 26, Medios_id: 2 },
        { duracion: 180.9, motivo: "Solicitud de ayuda para un bug", fecha: new Date("2023-05-11"), Clientes_id: 16, Medios_id: 1 },
        { duracion: null, motivo: "Problema con la facturación del juego", fecha: new Date("2023-05-12"), Clientes_id: 29, Medios_id: 3 },
        { duracion: null, motivo: "Consulta sobre los términos del servicio", fecha: new Date("2023-05-13"), Clientes_id: 24, Medios_id: 2 }
      ]
})