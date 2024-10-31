import prisma from "../../prisma";
import RouterController from "../RouterController";



export class AreasController extends RouterController {
    constructor(){
        super(prisma.areas,"área")
    }
}