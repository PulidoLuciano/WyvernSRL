import { z } from "zod";

export const nombreSchema = z.string().trim().min(2, "Un nombre debe tener al menos dos letras").max(32, "Un nombre no puede tener mas de treinta y dos letras");

export const correoSchema = z.string().trim().email().max(45, "Un correo no puede tener mas de 45 caracteres");

export const telefonoSchema = z.string().trim().regex(/"^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"/, "El número de teléfono no parece serlo");

export const idSchema = z.coerce.number();

export const dateTimeSchema = z.string().datetime({ message: "La fecha introducida no cumple el formato ISO"});

export const borradoSchema = z.coerce.boolean().optional();