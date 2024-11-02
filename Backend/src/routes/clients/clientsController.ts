import nodemailer from "nodemailer";
import prisma from "../../prisma"
import RouterController from "../RouterController"
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: 587,
    auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASSWORD_SMTP
    }
});

export default class ClientsController extends RouterController{
    constructor(){
        super(prisma.clientes, "cliente");

        this.broadcastToSubscribers = this.broadcastToSubscribers.bind(this);
    }

    public async broadcastToSubscribers(req : Request, res : Response){
        const subscribedUsers : [{correo : string}] = await this.prismaModel.findMany({ where: { suscripto: true }, select: { correo: true }})
        const correos = subscribedUsers.map((user : {correo : string}) => user.correo);
        const stringTo = correos.join(", ");
        const info = await transporter.sendMail({
            from: 'Wyvern SRL" <announcements@wyvern.games>',
            to: stringTo,
            subject: req.body.subject,
            text: req.body.text,
            html: this.createMailWithTemplete(req.body.text),
        });
        return res.json(info)  
    }

    private createMailWithTemplete(text : string){
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>WyvernSRL correo anuncio</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #463772;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 150px;
                }
                .hero {
                    width: 100%;
                    height: auto;
                }
                .content {
                    padding: 20px;
                }
                .content h1 {
                    font-size: 24px;
                    color: #111;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #666;
                }
                .cta-button {
                    display: inline-block;
                    padding: 15px 25px;
                    margin: 20px 0;
                    color: #fff;
                    background-color: #ff5733;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .footer {
                    background-color: #463772;
                    color: #fff;
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                }
                .footer a {
                    color: #ff5733;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Encabezado con el logo -->
                <div class="header">
                    <img src="https://res.cloudinary.com/dgfysjx2b/image/upload/v1730576092/WyvernLogoBlanco_atklcz.png" alt="Logo de la empresa">
                </div>

                <!-- Contenido principal -->
                <div class="content">
                    ${text}
                </div>

                <!-- Pie de página -->
                <div class="footer">
                    <p>Gracias por ser parte de nuestra comunidad.</p>
                    <p>&copy; 2024 WyvernSRL. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `
    }
}


