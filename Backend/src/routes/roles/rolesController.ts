import prisma from "../../prisma";
import RouterController from "../RouterController";



export class RolesController extends RouterController {
    constructor(){
        super(prisma.roles,"rol")
    }
}