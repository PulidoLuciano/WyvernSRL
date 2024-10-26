import prisma from "../../prisma"
import RouterController from "../RouterController"

export default class ClientsController extends RouterController{
    constructor(){
        super(prisma.clientes, "cliente");
    }
}