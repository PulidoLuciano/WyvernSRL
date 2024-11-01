import { WyvernRoute } from "../../types";
import { ROLE } from "../../utils/Role";
import parseQueries from "../../middlewares/parseQueries";
import { validateData } from "../../middlewares/validateData";
import audit from "../../middlewares/audit";
import { IdsSchema } from "../../schemas/usersSchemas";
import { EmployeesController } from "./employeesController";
import { EmployeeSchemaCreate, EmployeeSchemaFilter } from "../../schemas/employeesSchema";

const controlador = new EmployeesController();


const EMPLOYEES_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin, ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(EmployeeSchemaFilter)
        ],
        handler: controlador.getAll
    },
    {
        path: "/:id",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
            parseQueries(EmployeeSchemaFilter)
        ],
        handler: controlador.getById
    },
    {
        path: "/",
        method: "POST",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH],
        middlewares: [
            validateData(EmployeeSchemaCreate),
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
            validateData(EmployeeSchemaCreate),
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
    {
        path: "/:id/position",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
        ],
        handler: controlador.getCurrentPosition
    },
    {
        path: "/:id/career",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.RRHH, ROLE.Auditor],
        middlewares: [
        ],
        handler: controlador.getCareer
    },
]


export default EMPLOYEES_ROUTES