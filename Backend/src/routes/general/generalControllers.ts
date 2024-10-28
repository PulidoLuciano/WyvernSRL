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