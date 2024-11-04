export interface employeeType {
    name: string;
    email: string;
    dni: string | null;
    hiringDate: string | null ;
    phone: string;
    country:string | null;
    state: string | null;
    salary: string | null;
    positions: string | null
}


export interface CreateEmployeesErrors {
    name?: string;
    email?: string;
    dni?: string;
    hiringDate?: string;
    phone?: string;
    country?:string;
    state?: string;
    salary?: string;
    positions?: string

}

