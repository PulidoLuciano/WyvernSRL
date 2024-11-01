import { WyvernRouter } from "../types";
import CLIENTS_ROUTES from "./clients/clients";
import GENERAL_ROUTES from "./general/general";
import SALES_ROUTES from "./sales/sales";
import USERS_ROUTES from "./users/users";
import PRODUCTS_ROUTES from "./products/products";
import AREAS_ROUTES from "./areas/areas";
import POSITIONS_ROUTES from "./puestos/puestos";
import ROLES_ROUTES from "./roles/roles";
import PROVIDERS_ROUTES from "./providers/providers";
import MARKETS_ROUTES from "./markets/markets";
import EMPLOYEES_ROUTES from "./employees/employees";
import CONTRACTS_ROUTES from "./contracts/contracts";
import PURCHASES_ROUTES from "./purchase/purchase";

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
    },
    {
        path:"/products",
        routes: PRODUCTS_ROUTES
    },
    {
        path: "/areas",
        routes: AREAS_ROUTES
    },
    {
        path: "/positions",
        routes: POSITIONS_ROUTES
    },
    {
        path: "/roles",
        routes: ROLES_ROUTES
    },
    {
        path: "/providers",
        routes: PROVIDERS_ROUTES
    },
    {
        path: "/markets",
        routes: MARKETS_ROUTES
    },
    {
        path: "/employees",
        routes: EMPLOYEES_ROUTES
    },
    {
        path: "/contracts",
        routes: CONTRACTS_ROUTES
    },
    {
        path: "/purchases",
        routes: PURCHASES_ROUTES
    }
]

export default ROUTERS;