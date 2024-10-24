import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { getAllUsers, login } from "./usersController"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"
import { validateData } from "../../middlewares/validateData.ts"
import { LoginSchema } from "../../schemas/usersSchemas.ts"

const USERS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer todos los usuarios
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Auditor],
        middlewares: [],
        handler: getAllUsers
    },
    {
        //Login de usuario con cookie
        path: "/login",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [
            validateData(LoginSchema)
        ],
        handler: login
    },
    {
        //Registrarse (crear usuario)
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Traer usuario
        path: "/:userId",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Eliminar usuario
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Modificar usuario
        path: "/:userId",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
]

export default USERS_ROUTES