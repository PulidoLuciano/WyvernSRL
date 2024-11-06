import { Request, Response } from "express";
import prisma from "../../prisma";
import RouterController from "../RouterController";
import { z } from "zod";



export class AreasController extends RouterController {
    constructor(){
        super(prisma.areas,"área")
    }

    public async getEmployees(req : Request, res : Response){
        const {id} = req.params;
        const idNumber : number = z.coerce.number().parse(id);
        const employees = await prisma.empleados.findMany({
            where: {
                Empleados_Puestos: {
                    some: {
                        fechaFinal: null,
                        Puestos: {
                            Areas: {
                                id: idNumber
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                nombre: true,
                dni: true,
                correo: true,
                Empleados_Puestos: {
                    where: {
                        fechaFinal: null,
                    },
                    include: {
                        Puestos: true
                    }
                },
                Provincias: true
            }
        }) 
        res.json(employees);
        return employees;
    }
}