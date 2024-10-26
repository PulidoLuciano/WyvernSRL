import prisma from "../../prisma"
import RouterController from "../RouterController"

export default class ContactsController extends RouterController{
    constructor(){
        super(prisma.contactos, "contacto");
    }
}