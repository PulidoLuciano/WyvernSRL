import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { getAllUsers } from "./usersController"

const USERS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin],
        middlewares: [],
        handler: getAllUsers
    }
]

export default USERS_ROUTES