import { Request, Response } from "express";
import prisma from "../../prisma";
import RouterController from "../RouterController";
import { idSchema } from "../../schemas/generalSchemas";



export class EmployeesController extends RouterController {
    constructor(){
        super(prisma.empleados,"empleado")

        this.update = this.update.bind(this);
    }

    public async create(req: Request, res: Response){
        const Puestos_id = req.body.Puestos_id;
        delete req.body.Puestos_id
        const employee = (await super.create(req, res));
        let data = { 
            Empleados_id: employee.id,
            Puestos_id: Puestos_id,
            fechaInicio: new Date(Date.now()).toISOString(),
            fechaFinal: null
        }
        return await prisma.empleados_Puestos.create({ data });
    }

    public async update(req: Request, res: Response){
        const Puestos_id = req.body.Puestos_id;
        const { id } = req.params;
        const idNumber = idSchema.parse(id); 
        delete req.body.Puestos_id;
        await super.updateById(req, res);
        const position = await prisma.empleados_Puestos.findFirst({ 
            where: { Empleados_id: idNumber, fechaFinal: null },
            select: { Puestos_id: true }
        });
        if(position?.Puestos_id == Puestos_id)
            return;

        if(position)
            await prisma.empleados_Puestos.updateMany({ where: { Puestos_id: position.Puestos_id, Empleados_id: idNumber, fechaFinal: null }, data: { fechaFinal: new Date(Date.now()).toISOString()}})
        let data = { 
            Empleados_id: idNumber,
            Puestos_id: Puestos_id,
            fechaInicio: new Date(Date.now()).toISOString(),
            fechaFinal: null
        }
        return await prisma.empleados_Puestos.create({ data });
    }

    public async getCurrentPosition(req: Request, res: Response){
        const { id } = req.params;
        const idNumber = idSchema.parse(id);
        const position = await prisma.empleados_Puestos.findFirst({ 
            where: { Empleados_id: idNumber, fechaFinal: null },
            select: { Puestos: { select:{Areas: true, nombre: true, id:true },   }}
        });
        res.json(position);
    }

    public async getCareer(req: Request, res: Response){
        const { id } = req.params;
        const idNumber = idSchema.parse(id);
        const career = await prisma.empleados_Puestos.findMany({ 
            where: { Empleados_id: idNumber },
            select: { id:true, Puestos: { select: {Areas: true, nombre: true} }, fechaInicio: true, fechaFinal: true },
            orderBy: { fechaInicio: "desc" }
        });
        res.json(career);
    }
}