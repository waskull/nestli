import { IsArray, IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { EnumToString } from "../../common/utils/enumToString";
import { AppRoles } from "../../app.roles";
export class CreateUserDto{
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;

    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'La contraseña debe de tener minimo 2 caracteres'})
    password: string;

    @IsString({message:'El nombre debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El nombre debe de tener minimo 2 caracteres'})
    firstname: string;

    @IsString({message:'El apellido debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El apellido debe de tener minimo 2 caracteres'})
    lastname: string;

    @IsArray()
    @IsEnum(AppRoles, {each: true, message: `Debes escoger un rol valido entre: ${EnumToString(AppRoles)}`})
    roles: string[];

    @IsString({message:'La cedula debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'La cedula debe de tener minimo 3 caracteres'})
    cedula: string;

    @IsOptional()
    @MinLength(5, {message:'El telefono debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone?: string;

    @IsDateString()
    birthdate: Date;
}


export class CreateUserDtoPass{
    @IsEmail({}, {message:'El correo debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'El correo debe de tener minimo 2 caracteres'})
    email: string;

    @IsOptional()
    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'La contraseña debe de tener minimo 2 caracteres'})
    password: string;

    @IsString({message:'El nombre debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El nombre debe de tener minimo 2 caracteres'})
    firstname: string;

    @IsString({message:'El apellido debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El apellido debe de tener minimo 2 caracteres'})
    lastname: string;

    @IsArray()
    @IsEnum(AppRoles, {each: true, message: `Debes escoger un rol valido entre: ${EnumToString(AppRoles)}`})
    roles: string[];

    @IsString({message:'La cedula debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'La cedula debe de tener minimo 3 caracteres'})
    cedula: string;

    @IsOptional()
    @MinLength(5, {message:'El telefono debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone?: string;

    @IsDateString()
    birthdate: Date;
}