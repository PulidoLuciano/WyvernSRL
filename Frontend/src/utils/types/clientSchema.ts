import {z} from 'zod';


const clientSchema = z.object({
    name: z.string(),
    email: z.string().email({message: "E-mail invalido"}),
    platform: z.string({required_error:"Este campo es obligatorio"}),
    country: z.string()
});



export const clientRequired = clientSchema.required();