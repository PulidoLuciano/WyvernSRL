import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import ClientsController from "./clientsController.ts"
import audit from "../../middlewares/audit.ts"
import { validateData } from "../../middlewares/validateData.ts"
import { ClientSchemaFilter, ClientSchemaCreate, broadcastSchema } from "../../schemas/clientsSchemas.ts"
import { IdsSchema } from "../../schemas/usersSchemas.ts"
import ContactsController from "./contactsController.ts"
import { ContactsSchemaCreate, ContactsSchemaFilter } from "../../schemas/contactsSchemas.ts"
import parseQueries from "../../middlewares/parseQueries.ts"
import { NextFunction, Request, Response } from "express"
import { SalesSchemaFilter } from "../../schemas/salesSchema.ts"
import { SalesController } from "../sales/salesControllers.ts"

const controlador = new ClientsController();
const controladorContactos = new ContactsController();
const controladorVentas = new SalesController()

const CLIENTS_ROUTES : Array<WyvernRoute> = [
    {
        //Traer varios clientes
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            parseQueries(ClientSchemaFilter)
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
            validateData(ClientSchemaCreate),
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
        middlewares: [
            parseQueries(ClientSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        //Modificar cliente
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(ClientSchemaCreate),
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
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            validateData(broadcastSchema)
        ],
        handler: controlador.broadcastToSubscribers
    },
    {
        //Traer contactos del cliente
        path: "/:id/contacts",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            (req : Request, _ : Response, next : NextFunction) => {
                req.query = { 
                    Clientes_id: req.params.id,
                    borrado: "false",
                    include: [
                        "id",
                        "motivo",
                        "fecha",
                        "Medios",
                        "borrado"
                    ]
                };
                next();
            },
            parseQueries(ContactsSchemaFilter)
        ],
        handler: controladorContactos.getAll
    },
    {
        //Traer contactos del cliente
        path: "/:id/sales",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            (req : Request, _ : Response, next : NextFunction) => {
                req.query = { 
                    Clientes_id: req.params.id,
                    borrado: "false",
                    include: [
                        "Productos",
                        "id",
                        "fecha"
                    ]
                };
                next();
            },
            parseQueries(SalesSchemaFilter)
        ],
        handler: controladorVentas.getAll
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
        middlewares: [
            parseQueries(ContactsSchemaFilter)
        ],
        handler: controladorContactos.getById
    },
    {
        //Modificar contacto
        path: "/contacts/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(ContactsSchemaCreate)
        ],
        handler: controladorContactos.updateById
    },
    {
        //Crear contacto
        path: "/contacts",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(ContactsSchemaCreate)
        ],
        handler: controladorContactos.create
    },
]

export default CLIENTS_ROUTES