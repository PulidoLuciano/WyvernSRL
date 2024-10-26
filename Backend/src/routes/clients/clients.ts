import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"
import ClientsController from "./clientsController.ts"
import audit from "../../middlewares/audit.ts"
import { validateData } from "../../middlewares/validateData.ts"
import { ClientSchema } from "../../schemas/clientsSchemas.ts"
import { IdsSchema } from "../../schemas/usersSchemas.ts"
import ContactsController from "./contactsController.ts"
import { ContactsSchema } from "../../schemas/contactsSchemas.ts"
import parseQueries from "../../middlewares/parseQueries.ts"

const controlador = new ClientsController();
const controladorContactos = new ContactsController();

const CLIENTS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer varios clientes
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            parseQueries
        ],
        handler: controlador.getAll
    },
    {
        //Crear nuevo cliente
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(ClientSchema),
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
            validateData(ClientSchema),
            audit
        ],
        handler: controlador.updateById
    },
    {
        //Eliminar cliente
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(IdsSchema),
            audit
        ],
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
        path: "/contacts",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            validateData(IdsSchema)
        ],
        handler: controladorContactos.deleteMany
    },
    {
        //Traer contacto
        path: "/contacts/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: controladorContactos.getById
    },
    {
        //Modificar contacto
        path: "/contacts/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [],
        handler: controladorContactos.updateById
    },
    {
        //Crear contacto
        path: "/contacts",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(ContactsSchema)
        ],
        handler: controladorContactos.create
    },
]

export default CLIENTS_ROUTES