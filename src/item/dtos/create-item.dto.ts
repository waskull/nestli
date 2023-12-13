import { IsNumber, IsString, MinLength, Min, IsOptional, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export class CreateItemDto {

    @IsString({ message: 'Debe de ser una cadena de caracteres' })
    @MinLength(3, { message: 'Nombre debe de tener mas de 2 caracteres' })
    name: string;

    @IsNumber()
    @Min(0.1, { message: 'Precio debe de ser al menos 0.1' })
    price: number;

    @IsNumber()
    @Min(0.1, { message: 'Precio al mayor debe de ser al menos 0.1' })
    wholesale_price: number;

    @IsString({ message: 'La descripción de la imagen debe de ser una cadena de caracteres' })
    @MinLength(3, { message: 'La descripción debe de tener mas de 2 caracteres' })
    desc: string;

    @IsOptional()
    @IsString({ message: 'El nombre de la imagen debe de ser una cadena de caracteres' })
    @MinLength(3, { message: 'La imagen debe de tener mas de 2 caracteres' })
    image: string;
}

