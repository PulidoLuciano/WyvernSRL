import { WyvernRouter } from "../types";
import UsersRouter from "./users/users"

const ROUTERS : Array<WyvernRouter> = [
    {
        path: "/users",
        router: UsersRouter
    }
]

export default ROUTERS;