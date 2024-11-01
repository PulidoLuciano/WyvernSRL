import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { MarketsController } from "./marketsController";
import { MarketsSchemaCreate, MarketsSchemaFilter } from "src/schemas/marketSchema";

const controlador = new MarketsController();


const MARKETS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(MarketsSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(MarketsSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(MarketsSchemaCreate),
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
            validateData(MarketsSchemaCreate),
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
]


export default MARKETS_ROUTES