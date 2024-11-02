import { Request, Response } from "express";
import prisma from "../../prisma";
import RouterController from "../RouterController";



export class ProvidersController extends RouterController {
    constructor(){
        super(prisma.proveedores,"proveedor")

        this.getBreaches = this.getBreaches.bind(this);
        this.getScore = this.getScore.bind(this);
    }

    public async getBreaches(req : Request, res : Response){
        const breaches = await this.findBreaches(req);
        res.json(breaches)
    }

    public async getScore(req : Request, res : Response){
        const breaches = await this.findBreaches(req);
        const scores = breaches.map((breach) => breach.NivelDeIncumplimiento.ponderacion);
        if (scores.length === 0) return res.json({ nombre: "Sin puntuaciones"});
        const suma = scores.reduce((acumulador, valor) => acumulador + valor, 0);
        const promedio = Math.round(suma / scores.length);
        const nivel = await prisma.nivelDeIncumplimiento.findFirst({ where: { ponderacion: promedio }, select: { nombre: true }});
        return res.json(nivel);
    }

    private async findBreaches(req : Request){
        const { id } = req.params;
        const idNumber = Number(id);
        const breaches = await prisma.incumplimientos.findMany({ 
            where: { 
                "OR": [ 
                    {
                        Compras: {
                            Proveedores_id : idNumber
                        }
                    }, 
                    {
                        Contratos: {
                            Proveedores_id : idNumber
                        }
                    }] 
            },
            select: {
                descripcion: true,
                fecha: true,
                Compras_id: true, 
                Contratos_id: true,
                NivelDeIncumplimiento: true
            },
            orderBy: {
                fecha: "desc"
            }
        })
        return breaches;
    }
}