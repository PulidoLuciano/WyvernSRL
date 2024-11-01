import { WyvernRoute } from "src/types";
import {MediosContactoController, PaisesController, PlataformasController, ProvinciasController} from "./generalControllers";

const controladorPaises = new PaisesController();
const controladorPlataformas = new PlataformasController();
const controladorMedios = new MediosContactoController();
const controladorProvincias = new ProvinciasController();

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
        handler: controladorMedios.getAll
    },
    {
        //Traer medios de contacto
        path: "/provinces",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorProvincias.getAll
    },
]


export default GENERAL_ROUTES;