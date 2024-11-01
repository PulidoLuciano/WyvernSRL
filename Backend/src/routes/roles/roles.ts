import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { RolesController } from "./rolesController";
import { RolesSchemaFilter } from "../../schemas/rolesSchema";

const controlador = new RolesController();


const ROLES_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(RolesSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(RolesSchemaFilter)
        ],
        handler: controlador.getById
    },
]


export default ROLES_ROUTES