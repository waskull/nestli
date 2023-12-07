import { IsEmail, IsString, MinLength } from "class-validator";

export class ResetDTO{
    @IsString({message: 'El correo debe de ser una cadena de caracteres'})
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;
}