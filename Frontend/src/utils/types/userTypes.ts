export interface userType{
    name: string;
    password: string;
    employee: string,
    role: string;
}

export interface userFilterType{
    name: string;
    dni: string;
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

export interface FilterUserErrors{
    name?: string;
    dni?: string;
    role?: string;
}
