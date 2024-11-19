import { Request, Response } from "express";
import prisma from "../../prisma"
import RouterController from "../RouterController"
import ApiError from "../../utils/ApiError";
import HttpStatuses from "../../utils/HttpStatus";

export class SalesController extends RouterController{
    constructor(){
        super(prisma.ventas, "venta");

        this.platformsStats = this.platformsStats.bind(this);
        this.monthsStats = this.monthsStats.bind(this);
        this.productsStats = this.productsStats.bind(this);
        this.countiesStats = this.countiesStats.bind(this);
        this.create = this.create.bind(this);
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { Clientes_id, Productos_id } = req.body;
        const venta = await prisma.ventas.findFirst({ where: { Clientes_id: Clientes_id, Productos_id: Productos_id}});
        if(!venta)
            return super.create(req, res)
        throw new ApiError(HttpStatuses.BAD_REQUEST, "El usuario elegido ya ha comprado ese juego.");
    }

    public async platformsStats(req : Request, res : Response){
        const stats = await prisma.$queryRaw`
            SELECT 
                p.id AS plataforma_id,
                p.nombre AS nombre_plataforma,
                COUNT(v.id) AS cantidad_productos_vendidos
            FROM 
                Plataformas AS p
            JOIN 
                Clientes AS c ON c.Plataformas_id = p.id
            JOIN 
                Ventas AS v ON v.Clientes_id = c.id
            JOIN 
                Productos AS prod ON prod.id = v.Productos_id
            WHERE 
                p.borrado = 0
                AND c.borrado = 0
                AND v.borrado = 0
                AND prod.borrado = 0
            GROUP BY 
                p.id, p.nombre
            ORDER BY 
                cantidad_productos_vendidos DESC;
        `;
        const response = await JSON.parse(this.json(stats));
        res.json(response);
    }

    public async monthsStats(req : Request, res : Response){
        const stats = await prisma.$queryRaw`
            SELECT 
                meses.mes AS mes_anio,
                IFNULL(COUNT(v.id), 0) AS cantidad_ventas
            FROM 
                ( 
                    SELECT 
                        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS mes
                    FROM 
                        (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
                        UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
                        UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11) AS nums
                ) AS meses
            LEFT JOIN 
                Ventas AS v ON DATE_FORMAT(v.fecha, '%Y-%m') = meses.mes AND v.borrado = 0
            GROUP BY 
                meses.mes
            ORDER BY 
                meses.mes;
        `;
        const response = await JSON.parse(this.json(stats));
        res.json(response);
    }

    public async productsStats(req : Request, res : Response){
        const stats = await prisma.$queryRaw`
            SELECT 
                p.id AS producto_id,
                p.nombre AS nombre_producto,
                IFNULL(COUNT(v.id), 0) AS cantidad_ventas
            FROM 
                Productos AS p
            LEFT JOIN 
                Ventas AS v ON v.Productos_id = p.id 
                    AND v.borrado = 0 
            GROUP BY 
                p.id
            ORDER BY 
                cantidad_ventas DESC;
        `;
        const response = await JSON.parse(this.json(stats));
        res.json(response);
    }

    public async countiesStats(req : Request, res : Response){
        const stats = await prisma.$queryRaw`
            SELECT 
                pa.id AS pais_id,
                pa.nombre AS nombre_pais,
                IFNULL(COUNT(v.id), 0) AS cantidad_ventas
            FROM 
                Paises AS pa
            LEFT JOIN 
                Clientes AS c ON c.Paises_id = pa.id AND c.borrado = 0
            LEFT JOIN 
                Ventas AS v ON v.Clientes_id = c.id AND v.borrado = 0
			WHERE
				pa.borrado = 0
            GROUP BY 
                pa.id
            ORDER BY 
                cantidad_ventas DESC;
        `;
        const response = await JSON.parse(this.json(stats));
        res.json(response);
    }

    private json(param: any): any {
        return JSON.stringify(
          param,
          (key, value) => (typeof value === "bigint" ? Number(value.toString()) : value)
        );
      };
}