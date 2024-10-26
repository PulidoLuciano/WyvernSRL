import { z } from "zod";

export const ContactsSchema = z.object({
    duracion: z.string().trim().nullable(),
    motivo: z.string().trim(),
    fecha: z.date(),
    Clientes_id: z.coerce.number(),
    Medios_id: z.coerce.number()
})