import prisma from "../../prisma";
import RouterController from "../RouterController";



export class PuestosController extends RouterController {
    constructor(){
        super(prisma.puestos,"puestos")
    }
}