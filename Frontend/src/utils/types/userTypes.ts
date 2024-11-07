export interface userType{
    name: string;
    password: string;
    employee: string,
    role: string;
}

export interface CreateUserErrors{
    name?: string;
    password?: string;
    employee?: string,
    role?: string;
}

export interface Credential{
    nombre: string;
    password: string; 
}

export interface credentialErrors {
    nombre?: string;
    password?: string;
}