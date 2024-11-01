import prisma from "../../prisma";
import RouterController from "../RouterController";

export class PaisesController extends RouterController{
    constructor(){
        super(prisma.paises, "país")
    }

}

export class PlataformasController extends RouterController{
    constructor(){
        super(prisma.plataformas, "plataforma")
    }
}

export class MediosContactoController extends RouterController{
    constructor(){
        super(prisma.medios, "medio")
    }
}

export class ProvinciasController extends RouterController{
    constructor(){
        super(prisma.provincias, "provincia")
    }
}

export class MonedasController extends RouterController{
    constructor(){
        super(prisma.monedas, "moneda")
    }
}