import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { ProvidersController } from "./providersController";
import { ProviderSchemaCreate, ProviderSchemaFilter } from "../../schemas/providersSchema";

const controlador = new ProvidersController();


const PROVIDERS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(ProviderSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(ProviderSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(ProviderSchemaCreate),
            audit
        ],
        handler: controlador.create
    },
    {
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(ProviderSchemaCreate),
            audit
        ],
        handler: controlador.updateById
    },
    {
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(IdsSchema),
            audit
        ],
        handler: controlador.deleteMany
    },
    {
        path: "/:id/breaches",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
        ],
        handler: controlador.getBreaches
    },
    {
        path: "/:id/score",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
        ],
        handler: controlador.getScore
    },
]


export default PROVIDERS_ROUTES