import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { UsersController } from "./usersController"
import { validateData } from "../../middlewares/validateData.ts"
import { IdsSchema, LoginSchema, UserSchema, UserSchemaOptional } from "../../schemas/usersSchemas.ts"

const controlador = new UsersController();

const USERS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer todos los usuarios
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Auditor],
        middlewares: [],
        handler: controlador.getAll
    },
    {
        //Login de usuario con cookie
        path: "/login",
        method: "POST",
        authentication: false,
        authorization: [],
        middlewares: [
            validateData(LoginSchema)
        ],
        handler: controlador.login
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
        handler: controlador.create
    },
    {
        //Traer usuario
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Auditor],
        middlewares: [],
        handler: controlador.getById
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
        handler: controlador.deleteMany
    },
    {
        //Modificar usuario
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [
            validateData(UserSchemaOptional)
        ],
        handler: controlador.updateById
    },
]

export default USERS_ROUTES