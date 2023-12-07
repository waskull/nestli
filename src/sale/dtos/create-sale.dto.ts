import { IsNumber, Min,ArrayMinSize, ValidateNested, IsPositive, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsString, IsEnum, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { Method } from "../enum";
import { EnumToString } from "../../common/utils/enumToString";

export class item{
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    quantity!: number;
    
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    id!: number;
}

export class CreateSaleDto{
    @IsArray()
    @ArrayMinSize(1, {"message":"Debes enviar al menos un articulo e indicar su cantidad"})
    @ValidateNested({each:true, message:"Articulo invalido"})
    @Type(() => item)
    items!: item[];
    
    @IsOptional()
    @IsNumber()
    @IsPositive({message:"El ID del vendedor debe de ser valido"})
    salesman!: number;
	
	@IsOptional()
    @IsNumber()
    @IsPositive({message:"El ID del cliente debe de ser valido"})
    user!: number;

	@IsOptional()
    @IsArray()
    pay_code: string[];

    @IsString({message:'El metodo de pago debe de ser una cadena de caracteres'})
    @IsEnum(Method, {each: true, message: `Debes de escoger un metodo pago entre estos: ${EnumToString(Method)}`})
    paymentMethod: string;
	
	@IsString({message:'La direccion de entrega debe de ser una cadena de caracteres'})
	@MinLength(3, {message:'La direccion de entrega debe de tener mas de 2 caracteres'})
    address: string;
}

export class editSaleDto{
    @IsNumber()
    @IsPositive({message:"El repartidor debe de ser valido"})
    delivery_man_id!: number;
	
}
