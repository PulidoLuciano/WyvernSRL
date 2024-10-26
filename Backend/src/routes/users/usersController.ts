import { Request, Response } from "express";
import prisma from "../../prisma";

export async function getAllUsers(_ : Request, res : Response){
    const usuarios = await prisma.usuarios.findMany();
    return res.json(usuarios);
}