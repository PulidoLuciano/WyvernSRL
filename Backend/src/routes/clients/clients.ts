import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"
import ClientsController from "./clientsController.ts"
import audit from "../../middlewares/audit.ts"

const controlador = new ClientsController();

const CLIENTS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer varios clientes
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: controlador.getAll
    },
    {
        //Crear nuevo cliente
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            audit
        ],
        handler: controlador.create
    },
    {
        //Traer cliente
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: controlador.getById
    },
    {
        //Modificar cliente
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            audit
        ],
        handler: controlador.updateById
    },
    {
        //Eliminar cliente
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: controlador.deleteMany
    },
    {
        //Enviar comunicados
        path: "/broadcast",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Traer contactos del cliente
        path: "/:clientId/contacts",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Eliminar contacto
        path: "/contacts/:contactId",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Traer contacto
        path: "/contacts/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Modificar contacto
        path: "/contacts/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
]

export default CLIENTS_ROUTES