import { WyvernRoute } from "src/types";
import {PaisesController, PlataformasController} from "./generalControllers";
import { ROLE } from "../../utils/Role";

const controladorPaises = new PaisesController();
const controladorPlataformas = new PlataformasController();

const GENERAL_ROUTES : Array<WyvernRoute> = [
    {
        //Traer paises
        path: "/countries",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorPaises.getAll
    },
    {
        //Traer plataformas
        path: "/platforms",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorPlataformas.getAll
    }
]


export default GENERAL_ROUTES;