import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;
    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'La contraseña debe de tener minimo 2 caracteres'})
    password: string;
}