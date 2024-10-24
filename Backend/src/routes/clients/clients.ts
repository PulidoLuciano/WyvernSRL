import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"

const CLIENTS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer varios clientes
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Crear nuevo cliente
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Traer cliente
        path: "/:clientId",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Modificar cliente
        path: "/:clientId",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Eliminar cliente
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
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
        //Eliminar cliente
        path: "/contacts/:contactId",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Traer contacto
        path: "/contacts/:contactId",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
    {
        //Modificar contacto
        path: "/:contactId",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    },
]

export default CLIENTS_ROUTES