import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { createUser, deleteUser, getAllUsers, getUserById, login, updateUserById } from "./usersController"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"
import { validateData } from "../../middlewares/validateData.ts"
import { IdsSchema, LoginSchema, UserSchema, UserSchemaOptional } from "../../schemas/usersSchemas.ts"

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
        middlewares: [
            validateData(UserSchema)
        ],
        handler: createUser
    },
    {
        //Traer usuario
        path: "/:userId",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Auditor],
        middlewares: [],
        handler: getUserById
    },
    {
        //Eliminar usuarios
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [
            validateData(IdsSchema)
        ],
        handler: deleteUser
    },
    {
        //Modificar usuario
        path: "/:userId",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [
            validateData(UserSchemaOptional)
        ],
        handler: updateUserById
    },
]

export default USERS_ROUTES