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