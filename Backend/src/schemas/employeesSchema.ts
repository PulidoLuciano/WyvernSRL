import { z } from "zod";
import { borradoSchema, correoSchema, dateTimeSchema, idSchema, nombreSchema, telefonoSchema, trueBooleanSchema } from "./generalSchemas";

export const EmployeeSchemaFilter = z.object({
    id:idSchema,
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema,
    dni: z.coerce.bigint({message: "Por favor escriba su DNI sin puntos ni letras"}),
    fechaContratacion: dateTimeSchema,
    sueldo: z.coerce.number({message: "El sueldo debe ser un número"}).min(0, {message: "El sueldo no puede ser menor que cero"}),
    borrado: borradoSchema,
    Provincias_id: idSchema,
    Provincias: z.any(),
    Usuarios: z.any(),
    Empleados_Puestos: z.any()
})

export const EmployeeSchemaCreate = z.object({
    nombre: nombreSchema,
    correo: correoSchema.optional().nullable(),
    telefono: telefonoSchema.optional().nullable(),
    dni: z.coerce.number({message: "Por favor escriba su DNI sin puntos ni letras"}).int("El DNI debe ser un entero"),
    fechaContratacion: dateTimeSchema,
    sueldo: z.coerce.number({message: "El sueldo debe ser un número"}).min(0, {message: "El sueldo no puede ser menor que cero"}),
    Provincias_id: idSchema,
    Puestos_id: idSchema
})