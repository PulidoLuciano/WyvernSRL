import { PrismaClient } from "@prisma/client"
import METODOS from "./METODOS"
import PROVEEDORES from "./PROVEEDORES"

export default (prisma : PrismaClient) => ({
    dependencies: [METODOS, PROVEEDORES],
    schema: prisma.proveedores_MetodosDePago,
    data: [
        { 
          Proveedores_id: 1, 
          MetodosDePago_id: 1, // Efectivo
          descripcion: "Pago en efectivo en oficina" 
        },
        { 
          Proveedores_id: 2, 
          MetodosDePago_id: 2, // Débito
          descripcion: "Tarjeta de débito terminación 1234" 
        },
        { 
          Proveedores_id: 3, 
          MetodosDePago_id: 3, // Crédito
          descripcion: "Tarjeta de crédito Visa terminación 5678" 
        },
        { 
          Proveedores_id: 4, 
          MetodosDePago_id: 4, // Transferencia
          descripcion: "CBU: 0123456789012345678901" 
        },
        { 
          Proveedores_id: 5, 
          MetodosDePago_id: 5, // Cheque
          descripcion: "Cheque a nombre de Proveedor X" 
        },
        { 
          Proveedores_id: 6, 
          MetodosDePago_id: 1, // Efectivo
          descripcion: "Pago en efectivo en sucursal del proveedor" 
        },
        { 
          Proveedores_id: 7, 
          MetodosDePago_id: 2, // Débito
          descripcion: "Tarjeta de débito MasterCard terminación 9876" 
        },
        { 
          Proveedores_id: 8, 
          MetodosDePago_id: 3, // Crédito
          descripcion: "Tarjeta de crédito American Express terminación 4321" 
        },
        { 
          Proveedores_id: 9, 
          MetodosDePago_id: 4, // Transferencia
          descripcion: "CBU: 1098765432109876543210" 
        },
        { 
          Proveedores_id: 10, 
          MetodosDePago_id: 5, // Cheque
          descripcion: "Cheque emitido el 12/10/2023" 
        },
        { 
          Proveedores_id: 1, 
          MetodosDePago_id: 4, // Transferencia
          descripcion: "CBU: 2233445566778899001122" 
        },
        { 
          Proveedores_id: 2, 
          MetodosDePago_id: 1, // Efectivo
          descripcion: "Pago en efectivo con boleta" 
        },
        { 
          Proveedores_id: 3, 
          MetodosDePago_id: 5, // Cheque
          descripcion: "Cheque posdatado a 30 días" 
        },
        { 
          Proveedores_id: 4, 
          MetodosDePago_id: 2, // Débito
          descripcion: "Tarjeta de débito terminación 4321" 
        },
        { 
          Proveedores_id: 5, 
          MetodosDePago_id: 3, // Crédito
          descripcion: "Tarjeta de crédito Visa terminación 8765" 
        },
        { 
          Proveedores_id: 6, 
          MetodosDePago_id: 4, // Transferencia
          descripcion: "CBU: 4455667788990011223344" 
        },
        { 
          Proveedores_id: 7, 
          MetodosDePago_id: 1, // Efectivo
          descripcion: "Pago en efectivo por caja" 
        },
        { 
          Proveedores_id: 8, 
          MetodosDePago_id: 5, // Cheque
          descripcion: "Cheque entregado el 01/10/2023" 
        },
        { 
          Proveedores_id: 9, 
          MetodosDePago_id: 2, // Débito
          descripcion: "Tarjeta de débito terminación 7654" 
        },
        { 
          Proveedores_id: 10, 
          MetodosDePago_id: 4, // Transferencia
          descripcion: "CBU: 6677889900112233445566" 
        }
      ]
})


