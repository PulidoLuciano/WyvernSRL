import prisma from "../../prisma";
import RouterController from "../RouterController";



export class ProductosController extends RouterController {
    constructor(){
        super(prisma.productos,"producto")
    }
}