import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient()
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await prisma.usuarios.findMany()
    res.json(users)
});

export {router as UsersRouter};