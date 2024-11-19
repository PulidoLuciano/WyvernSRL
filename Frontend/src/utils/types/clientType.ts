export interface clientType {
    name: string;
    email: string;
    platform: string;
    country: string;
    suscription: string;
    phone: string;
    deleted?:string
}

export interface CreateClientErrors{
    name?: string;
    email?: string;
    phone?: string;
    suscription?: string;
    country?: string;
    platform?: string;
}

export interface contactType{
    Clientes_id: number | null,
    Medio: string,
    duracion?: string,
    fecha: string | null,
    motivo: string
}

export interface createContactErrors{
    Medio?: string,
    duracion?: string,
    fecha?: string,
    motivo?: string
}

