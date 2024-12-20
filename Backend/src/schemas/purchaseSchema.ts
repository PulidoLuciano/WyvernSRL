import { z } from "zod";
import { borradoSchema, dateTimeSchema, descripcionSchema, idSchema, trueBooleanSchema } from "./generalSchemas";

export const PurchasesSchemaFilter = z.object({
    id: idSchema,
    descripcion: descripcionSchema,
    fechaCompra: dateTimeSchema,
    precioUnitario: z.coerce.number({ message: "Se require el campo monto"}).min(0, "El monto no puede ser menor que cero"),
    cantidad: z.coerce.number({ message: "Se require el campo monto"}).min(0, "La cantidad no puede ser menor que cero").int("La cantidad debe ser un entero"),
    entregado: trueBooleanSchema,
    pagado: trueBooleanSchema,
    Proveedores_id: idSchema,
    Monedas_id: idSchema,
    borrado: borradoSchema,
    Monedas: z.any(),
    Proveedores: z.any(),
    Incumplimientos: z.any()
})

export const PurchasesSchemaCreate = z.object({
    descripcion: descripcionSchema,
    fechaCompra: dateTimeSchema.max(new Date(Date.now()), "Esto no pudo suceder en el futuro!"),
    precioUnitario: z.coerce.number({ message: "Se require el campo monto"}).min(0, "El monto no puede ser menor que cero"),
    cantidad: z.coerce.number({ message: "Se require el campo monto"}).min(0, "La cantidad no puede ser menor que cero").int("La cantidad debe ser un entero"),
    entregado: trueBooleanSchema,
    pagado: trueBooleanSchema,
    Proveedores_id: idSchema,
    Monedas_id: idSchema,
})