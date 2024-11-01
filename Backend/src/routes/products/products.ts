import { WyvernRoute } from "src/types";
import { ROLE } from "../../utils/Role";
import { ProductosController } from "./productsController";
import parseQueries from "../../middlewares/parseQueries";
import { ProductsSchemaCreate, ProductsSchemaFilter } from "../../schemas/productsSchema";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";

const controladorProductos = new ProductosController();


const PRODUCTS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            parseQueries(ProductsSchemaFilter)
        ],
        handler: controladorProductos.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            parseQueries(ProductsSchemaFilter)
        ],
        handler: controladorProductos.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas],
        middlewares: [
            validateData(ProductsSchemaCreate),
            audit
        ],
        handler: controladorProductos.create
    },
    {
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas],
        middlewares: [
            validateData(ProductsSchemaCreate),
            audit
        ],
        handler: controladorProductos.updateById
    },
    {
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas],
        middlewares: [
            validateData(IdsSchema),
            audit
        ],
        handler: controladorProductos.deleteMany
    },
]


export default PRODUCTS_ROUTES