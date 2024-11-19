import * as Yup from "yup"
import { nameSchema } from "./generalSchemas"

export const areaSchema = Yup.object().shape({
    name: nameSchema
}) 
