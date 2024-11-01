import prisma from "../../prisma";
import RouterController from "../RouterController";



export class MarketsController extends RouterController {
    constructor(){
        super(prisma.rubros,"rubro")
    }
}