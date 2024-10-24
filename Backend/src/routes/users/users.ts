import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { getAllUsers } from "./usersController"
import ApiError from "../../utils/ApiError.ts"
import HttpStatuses from "../../utils/HttpStatus.ts"

const USERS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: false,
        authorization: [ROLE.Admin],
        middlewares: [],
        handler: getAllUsers
    },
    {
        path: "/login",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: (_, _1) => {throw new ApiError(HttpStatuses.NOT_IMPLEMENTED, "To do")}
    }
]

export default USERS_ROUTES