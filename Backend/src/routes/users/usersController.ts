import { Request, Response } from "express";
import prisma from "../../prisma";
import ApiError from "../../utils/ApiError";
import HttpStatuses from "../../utils/HttpStatus";
import bcrypt from 'bcrypt'
import json from 'jsonwebtoken'
import { env } from "process";
import { Usuarios } from "@prisma/client";

export async function getAllUsers(_ : Request, res : Response){
    const usuarios = await prisma.usuarios.findMany();
    return res.json(usuarios);
}

export async function login(req : Request, res : Response) {
    const { nombre, password } = req.body;

    const usuario = await prisma.usuarios.findFirst({where: {nombre}});

    if(!usuario)
        throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");

    const correctPassword = await bcrypt.compare(password, usuario.contrasenia);
    if(!correctPassword)
        throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");

    const role = await prisma.roles.findUnique({where: {id: usuario.Roles_id}})

    const token = json.sign({id: usuario.id, role: role.nombre}, env.JWT_PASSWORD);
    res.cookie("authenticationToken", token, {
        expires: new Date(Date.now() + 8640000),
        sameSite:'none',
        secure:true,
        httpOnly:false,
        priority:"high",
    });
    res.status(HttpStatuses.OK.code).json(usuario);
}

export async function createUser(req : Request, res : Response) {
    let userData = req.body;
    userData.contrasenia = await hashPassword(userData.contrasenia);
    const createdUser = await prisma.usuarios.create({data: userData});
    return res.json(createdUser);
}

export async function deleteUser(req : Request, res : Response) {
    const { ids } = req.body;
    const deletedUsers : Array<Usuarios> = []
    for (let index = 0; index < ids.length ; index++) {
        const id = Number(ids[index]);
        const exist = await existeId(id);
        if(exist)
            deletedUsers.push(await prisma.usuarios.delete({ where: { id } }));
    }
    return res.json(deletedUsers);
}

export async function getUserById(req : Request, res : Response) {
    const { userId } = req.params;
    const id = Number(userId);
    const user = await prisma.usuarios.findUnique({ where: {id}});
    if(!user)
        throw new ApiError(HttpStatuses.NOT_FOUND, "El usuario con ese id no existe");
    return res.json(user);
}

export async function updateUserById(req : Request, res : Response) {
    let userData = req.body;
    const { userId } = req.params;
    const id = Number(userId);
    const exist = await existeId(id);
    if(!exist)
        throw new ApiError(HttpStatuses.NOT_FOUND, "El usuario con ese id no existe");
    if(userData.contrasenia)
        userData.contrasenia = await hashPassword(userData.contrasenia);
    const userUpdated = await prisma.usuarios.update({ where: { id }, data: userData });
    return res.json(userUpdated);
}

async function existeId(id : number){
    const user = await prisma.usuarios.findFirst( { where: { id }, select: { id: true} })
    return (user) ? true : false;
}

async function hashPassword(password:string) {
    return await bcrypt.hash(password, 10);
}