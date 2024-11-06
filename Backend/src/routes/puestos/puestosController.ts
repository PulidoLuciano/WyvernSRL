import { Request, Response } from "express";
import prisma from "../../prisma";
import RouterController from "../RouterController";
import { z } from "zod";



export class PuestosController extends RouterController {
    constructor(){
        super(prisma.puestos,"puestos")
    }

    public async getEmployees(req : Request, res : Response){
        const {id} = req.params;
        const idNumber : number = z.coerce.number({message: "El id debe ser un number"}).parse(id);
        const employees = await prisma.empleados.findMany({
            where: {
                Empleados_Puestos: {
                    some: {
                        fechaFinal: null,
                        Puestos: {
                            id: idNumber
                        }
                    }
                }
            },
            select: {
                id: true,
                nombre: true,
                dni: true,
                correo: true,
                sueldo: true,
                Provincias: true
            }
        }) 
        res.json(employees);
        return employees;
    }
}