import express from "express";
import { ROLE } from "../../utils/Role.ts"
import type { WyvernRoute } from "../../types.d.ts"
import { getAllUsers } from "./usersController"
import authorization from "../../middlewares/authorization.ts";

const UsersRouter = express.Router();

const routerMethods = {
    GET: (path, middlewares, handler) => {UsersRouter.get(path, middlewares, handler)},
    POST: (path, middlewares, handler) => {UsersRouter.post(path, middlewares, handler)},
    PUT: (path, middlewares, handler) => {UsersRouter.put(path, middlewares, handler)},
    DELETE: (path, middlewares, handler) => {UsersRouter.delete(path, middlewares, handler)},
}

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

for (let i = 0; i < USERS_ROUTES.length; i++) {
    const route = USERS_ROUTES[i];
    const middlewares = (route.authentication) ? [authorization(route.authorization), ...route.middlewares] : route.middlewares
    routerMethods[route.method].call(this, route.path, middlewares, route.handler);
}

export default UsersRouter