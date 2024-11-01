import prisma from "../../prisma";
import RouterController from "../RouterController";



export class ContractsController extends RouterController {
    constructor(){
        super(prisma.contratos,"contrato")
    }
}