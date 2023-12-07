import { IsNumber, IsString, MinLength, Min, IsOptional, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export class CreateItemDto {

    @IsString({ message: 'Debe de ser una cadena de caracteres' })
    @MinLength(3, { message: 'Nombre debe de tener mas de 2 caracteres' })
    name: string;

    @IsNumber()
    @Min(0, { message: 'Precio debe de ser mayor a 2' })
    price: number;

    @IsOptional()
    @IsString({ message: 'El nombre de la imagen debe de ser una cadena de caracteres' })
    @MinLength(3, { message: 'La imagen debe de tener mas de 2 caracteres' })
    image: string;
}

