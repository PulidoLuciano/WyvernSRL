import { WyvernRoute } from "src/types";
import {BreachLevelController, CategoriesController, MediosContactoController, MonedasController, PaisesController, PlataformasController, ProvinciasController} from "./generalControllers";

const controladorPaises = new PaisesController();
const controladorPlataformas = new PlataformasController();
const controladorMedios = new MediosContactoController();
const controladorProvincias = new ProvinciasController();
const controladorMonedas = new MonedasController();
const controladorNiveles = new BreachLevelController()
const controladorCategorias = new CategoriesController();

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
    {
        //Traer medios de contacto
        path: "/currencies",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorMonedas.getAll
    },
    {
        //Traer medios de contacto
        path: "/breach_levels",
        method: "GET",
        authentication: false,
        authorization: [],
        middlewares: [],
        handler: controladorNiveles.getAll
    },
    {
        path:"/categories",
        method:"GET",
        authentication: false,
        authorization:[],
        middlewares:[],
        handler: controladorCategorias.getAll
    }
]


export default GENERAL_ROUTES;