import { Request, Response } from "express";
import prisma from "../../prisma";
import ApiError from "../../utils/ApiError";
import HttpStatuses from "../../utils/HttpStatus";
import bcrypt from 'bcrypt'
import json from 'jsonwebtoken'
import { env } from "process";

export async function getAllUsers(_ : Request, res : Response){
    const usuarios = await prisma.usuarios.findMany();
    return res.json(usuarios);
}

export async function login(req : Request, res : Response) {
    const { nombre, password } = req.body;

    if(!(nombre && password))
        throw new ApiError(HttpStatuses.BAD_REQUEST, "Se necesita un nombre y una contraseña");

    const usuario = await prisma.usuarios.findFirst({where: {nombre}});

    if(!usuario)
        throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");

    const correctPassword = await bcrypt.compare(password, usuario.contrasenia);
    if(!correctPassword)
        throw new ApiError(HttpStatuses.BAD_REQUEST, "Usuario o contraseña incorrectos");

    const role = await prisma.roles.findUnique({where: {id: usuario.Roles_id}})

    const token = json.sign({id: usuario.id, role}, env.JWT_PASSWORD);
    res.cookie(env.AUTHENTICATION_COOKIE_NAME, token, {
        expires: new Date(Date.now() + 8640000),
        sameSite:'none',
        secure:true,
        httpOnly:false,
        priority:"high",
    });
    res.status(HttpStatuses.OK.code).json(usuario);
}