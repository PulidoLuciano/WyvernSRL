import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { AreasController } from "./areasController";
import { AreasSchemaCreate, AreasSchemaFilter } from "../../schemas/areasSchema";

const controlador = new AreasController();


const AREAS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(AreasSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(AreasSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(AreasSchemaCreate),
            audit
        ],
        handler: controlador.create
    },
    {
        path: "/",
        method: "PUT",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(AreasSchemaCreate),
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


export default AREAS_ROUTES

