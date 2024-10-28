import { WyvernRouter } from "../types";
import CLIENTS_ROUTES from "./clients/clients";
import GENERAL_ROUTES from "./general/general";
import SALES_ROUTES from "./sales/sales";
import USERS_ROUTES from "./users/users";

const ROUTERS : Array<WyvernRouter> = [
    {
        path: "/users",
        routes: USERS_ROUTES
    },
    {
        path: "/clients",
        routes: CLIENTS_ROUTES
    },
    {
        path: "/sales",
        routes: SALES_ROUTES
    },
    {
        path: "",
        routes: GENERAL_ROUTES
    }
]

export default ROUTERS;