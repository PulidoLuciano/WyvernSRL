import prisma from "../../prisma";
import RouterController from "../RouterController";



export class ProvidersController extends RouterController {
    constructor(){
        super(prisma.proveedores,"proveedor")
    }
}