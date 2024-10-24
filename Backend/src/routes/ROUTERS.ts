import { WyvernRouter } from "../types";
import USERS_ROUTES from "./users/users";

const ROUTERS : Array<WyvernRouter> = [
    {
        path: "/users",
        routes: USERS_ROUTES
    },
]

export default ROUTERS;