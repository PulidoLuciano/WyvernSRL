import { WyvernRoute } from "src/types";
import { ROLE } from "../../utils/Role";
import { ProductosController } from "./productsController";
import parseQueries from "../../middlewares/parseQueries";
import { ProductsSchema } from "../../schemas/productsSchema";

const controladorProductos = new ProductosController();


const PRODUCTS_ROUTES : Array<WyvernRoute> = [
    {
        path: "/",
        method: "GET",
        authentication: true,
        authorization: [ROLE.Admin,ROLE.Ventas],
        middlewares: [
            parseQueries(ProductsSchema)
        ],
        handler: controladorProductos.getAll
    },
]


export default PRODUCTS_ROUTES