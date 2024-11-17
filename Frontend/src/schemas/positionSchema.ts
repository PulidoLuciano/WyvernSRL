import * as Yup from "yup"
import { nameSchema } from "./generalSchemas"
export const positionSchema = Yup.object().shape({
    name: nameSchema,
}) 
