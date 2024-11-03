import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { PurchasesController } from "./purchaseController";
import { PurchasesSchemaCreate, PurchasesSchemaFilter } from "../../schemas/purchaseSchema";

const controlador = new PurchasesController();


const PURCHASES_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(PurchasesSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(PurchasesSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(PurchasesSchemaCreate),
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
            validateData(PurchasesSchemaCreate),
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


export default PURCHASES_ROUTES