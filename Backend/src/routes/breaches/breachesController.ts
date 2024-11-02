import prisma from "../../prisma";
import RouterController from "../RouterController";



export class BreachesController extends RouterController {
    constructor(){
        super(prisma.incumplimientos,"incumplimiento")
    }
}