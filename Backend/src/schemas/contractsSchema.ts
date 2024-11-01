import { z } from "zod";
import { borradoSchema, dateTimeSchema, descripcionSchema, idSchema } from "./generalSchemas";

export const ContractsSchemaFilter = z.object({
    id: idSchema,
    descripcion: descripcionSchema,
    fechaVencimiento: dateTimeSchema,
    fechaPago: dateTimeSchema,
    monto: z.coerce.number({ message: "Se require el campo monto"}).min(0, "El monto no puede ser menor que cero"),
    Proveedores_id: idSchema,
    Monedas_id: idSchema,
    borrado: borradoSchema,
    Monedas: z.any(),
    Proveedores: z.any(),
    Incumplimientos: z.any()
})

export const ContractsSchemaCreate = z.object({
    descripcion: descripcionSchema,
    fechaVencimiento: dateTimeSchema,
    fechaPago: dateTimeSchema,
    monto: z.coerce.number({ message: "Se require el campo monto"}).min(0, "El monto no puede ser menor que cero"),
    Proveedores_id: idSchema,
    Monedas_id: idSchema,
})