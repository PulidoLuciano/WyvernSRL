import { WyvernRoute } from "src/types";
import {MediosContactoController, PaisesController, PlataformasController} from "./generalControllers";
import { ROLE } from "../../utils/Role";

const controladorPaises = new PaisesController();
const controladorPlataformas = new PlataformasController();
const controladorMedios = new MediosContactoController();

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
    },
    {
        //Traer medios de contacto
        path: "/medias",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorPlataformas.getAll
    }
]


export default GENERAL_ROUTES;