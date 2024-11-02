import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { ProductsSchemaCreate, ProductsSchemaFilter } from "../../schemas/productsSchema";
import { PurchasesController } from "./purchaseController";

const controlador = new PurchasesController();


const PURCHASES_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(ProductsSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras, ROLE.Auditor],
        middlewares: [
            parseQueries(ProductsSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Compras],
        middlewares: [
            validateData(ProductsSchemaCreate),
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
            validateData(ProductsSchemaCreate),
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