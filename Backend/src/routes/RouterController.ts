import { Request, Response } from "express";
import HttpStatuses from "../utils/HttpStatus";
import ApiError from "../utils/ApiError";
import { PrismaClient } from "@prisma/client";

type PrismaModel = PrismaClient[keyof PrismaClient]

export default abstract class RouterController{
    
    prismaModel; 
    entityName;
    
    constructor(prismaModel : any, entityName : string){
        this.prismaModel = prismaModel;
        this.entityName = entityName;

        // Bind manualmente el contexto para cada método, la propiedad this se pierde cuando se pasan como callbacks. Salvo que hagamos esto o usemos funciones flecha. Hago esto para poder usar super  después
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.deleteMany = this.deleteMany.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
    }

    public async getAll (req : Request, res : Response) {
        let entities;
        if(!req.query)
            entities = await this.prismaModel.findMany();
        entities = await this.prismaModel.findMany(req.query);
        return res.json(entities);
    }
    
    public async create (req : Request, res : Response) {
        let data = req.body;
        const created = await this.prismaModel.create({data});
        res.json(created);
        return created;
    }
    
    public async deleteMany (req : Request, res : Response) {
        const { ids } = req.body;
        const deletedUsers : Array<any> = []
        for (let index = 0; index < ids.length ; index++) {
            const id = Number(ids[index]);
            const exist = await this.existeId(id);
            if(exist)
                deletedUsers.push(await this.prismaModel.update({ where: { id }, data: { borrado: true } }));
        }
        return res.json(deletedUsers);
    }
    
    public async getById (req : Request, res : Response) {
        const { id } = req.params;
        const idNumber = Number(id);
        let user;
        if(req.query){
            if(req.query.select){
                user = await this.prismaModel.findUnique({ where: {id: idNumber}, select: req.query.select});
            }
            else{
                user = await this.prismaModel.findUnique({ where: {id: idNumber}});    
            }
        }else{
            user = await this.prismaModel.findUnique({ where: {id: idNumber}});
        }
        if(!user)
            throw new ApiError(HttpStatuses.NOT_FOUND, `No existe ${this.entityName} con ese id`);
        return res.json(user);
    }
    
    public async updateById (req : Request, res : Response) {
        let data = req.body;
        const { id } = req.params;
        const numberId = Number(id);
        const exist = await this.existeId(numberId);
        if(!exist)
            throw new ApiError(HttpStatuses.NOT_FOUND, `No existe ${this.entityName} con ese id`);
        const entityUpdated = await this.prismaModel.update({ where: { id: numberId }, data });
        return res.json(entityUpdated);
    }
    
    public async existeId (id : number) : Promise<Boolean> {
        const entity = await this.prismaModel.findFirst( { where: { id }, select: { id: true} })
        return (entity) ? true : false;
    }
}