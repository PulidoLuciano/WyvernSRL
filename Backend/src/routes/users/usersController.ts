import { Request, Response } from "express";
import prisma from "../../prisma";
import ApiError from "../../utils/ApiError";
import HttpStatuses from "../../utils/HttpStatus";
import bcrypt from 'bcrypt'
import json from 'jsonwebtoken'
import { env } from "process";
import RouterController from "../RouterController";

export class UsersController extends RouterController{
    constructor(){
        super(prisma.usuarios, "usuario");

        this.updateById = this.updateById.bind(this);
        this.hashPassword = this.hashPassword.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
    }

    public async updateById (req : Request, res : Response) {
        if(req.body.contrasenia)
            req.body.contrasenia = await this.hashPassword(req.body.contrasenia);
        return super.updateById(req, res);
    }

    public async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        req.body.contrasenia = await this.hashPassword(req.body.contrasenia);
        return super.create(req, res);
    }

    public async login(req : Request, res : Response) {
        const { nombre, password } = req.body;
    
        const usuario = await this.prismaModel.findFirst({where: {nombre}});
    
        if(!usuario)
            throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");
    
        const correctPassword = await bcrypt.compare(password, usuario.contrasenia);
        if(!correctPassword)
            throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");
    
        const role = await prisma.roles.findUnique({where: {id: usuario.Roles_id}})

        if(!role)
            throw new ApiError(HttpStatuses.NOT_FOUND, "El rol del usuario no existe")
    
        const jwtPassword = env.JWT_PASSWORD
        if(!jwtPassword)
            throw new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, "No se ha creado una contraseña para los tokens");
        const token = json.sign({id: usuario.id, role: role.nombre}, jwtPassword);
        res.cookie("authenticationToken", token, {
            expires: new Date(Date.now() + 8640000),
            sameSite:'none',
            secure:true,
            httpOnly:false,
            priority:"high",
        });
        res.status(HttpStatuses.OK.code).json(usuario);
    }

    private async hashPassword (password:string) : Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}