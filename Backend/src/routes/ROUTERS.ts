import { WyvernRouter } from "../types";
import CLIENTS_ROUTES from "./clients/clients";
import USERS_ROUTES from "./users/users";

const ROUTERS : Array<WyvernRouter> = [
    {
        path: "/users",
        routes: USERS_ROUTES
    },
    {
        path: "/clients",
        routes: CLIENTS_ROUTES
    }
]

export default ROUTERS;