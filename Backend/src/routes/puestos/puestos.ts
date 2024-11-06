import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { PuestosController } from "./puestosController";
import { PuestosSchemaCreate, PuestosSchemaFilter } from "../../schemas/puestosSchema";

const controlador = new PuestosController();


const POSITIONS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(PuestosSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(PuestosSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/:id/employees",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
        ],
        handler: controlador.getEmployees
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(PuestosSchemaCreate),
            audit
        ],
        handler: controlador.create
    },
    {
        path: "/:id",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(PuestosSchemaCreate),
            audit
        ],
        handler: controlador.updateById
    },
    {
        path: "/",
        method: "DELETE",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(IdsSchema),
            audit
        ],
        handler: controlador.deleteMany
    },
]


export default POSITIONS_ROUTES