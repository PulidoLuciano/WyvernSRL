import prisma from "../../prisma";
import RouterController from "../RouterController";



export class PurchasesController extends RouterController {
    constructor(){
        super(prisma.compras,"compra")
    }
}