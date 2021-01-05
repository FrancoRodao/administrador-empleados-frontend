export interface User{
    name: string
    lastname: string
    email: string
    phone: string
    _id?: string
}

export interface Employee {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    _id?: string
    created_At?: string
}

export interface Token{
    token: string
}

export interface signinUser{
    email: string
    password: string
}