import { IsEmail, IsString, MinLength } from "class-validator";

export class ResetDTO{
    @IsString({message: 'El correo debe de ser una cadena de caracteres'})
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;
}

export class PasswordDTO{
    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'La contraseña debe de tener minimo 2 caracteres'})
    password: string;
    
    @IsString({message:'El codigo debe de ser una cadena de caracteres'})
	@MinLength(6, {message:'El codigo debe de tener minimo 6 caracteres'})
    code: string;

    @IsString({message: 'El correo debe de ser una cadena de caracteres'})
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;
}