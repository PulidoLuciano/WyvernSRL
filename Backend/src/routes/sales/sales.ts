import { WyvernRoute } from "src/types";
import { SalesController } from "./salesControllers";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { SalesSchemaCreate, SalesSchemaFilter } from "../../schemas/salesSchema";
import audit from "../../middlewares/audit";
import { validateData } from "../../middlewares/validateData";
import { IdsSchema } from "../../schemas/usersSchemas";

const controladorVentas = new SalesController();

const SALES_ROUTES : Array<WyvernRoute> = [
    {
        //Traer varios ventas
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [
            parseQueries(SalesSchemaFilter)
        ],
        handler: controladorVentas.getAll
    },
    {
        //Crear nuevo venta
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(SalesSchemaCreate),
            audit
        ],
        handler: controladorVentas.create
    },
    {
        //Traer venta
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas, ROLE.Auditor],
        middlewares: [],
        handler: controladorVentas.getById
    },
    {
        //Modificar venta
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(SalesSchemaCreate),
            audit
        ],
        handler: controladorVentas.updateById
    },
    {
        //Eliminar ventas
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.Ventas],
        middlewares: [
            validateData(IdsSchema),
            audit
        ],
        handler: controladorVentas.deleteMany
    },
]

export default SALES_ROUTES;