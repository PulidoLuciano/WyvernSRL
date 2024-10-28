export interface User{
    id: number;
    nombre: string;
    contrasenia: string;
    Empleados_id: number,
    Roles_id: number;
    borrado: boolean
}

export interface Credential{
    nombre: string;
    password: string; 
}