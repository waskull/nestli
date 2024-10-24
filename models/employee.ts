export interface ICreateEmployee {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;
    phone: string;
    dni: string;
    address?: string
    rol: string;
    password?: string;
}

export interface IEmployee extends ICreateEmployee {
    id: string;
    isActive: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface IEditEmployee {
    id: string;
    password?: string;
    password2?: string;
}

export interface IDeleteEmployee {
    id: string;
    firstname: string;
    lastname: string;
}