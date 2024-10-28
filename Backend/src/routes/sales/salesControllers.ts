import prisma from "../../prisma"
import RouterController from "../RouterController"

export class SalesController extends RouterController{
    constructor(){
        super(prisma.ventas, "venta");
    }
}