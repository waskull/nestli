import { IsNumber, Min, IsDate, IsOptional } from "class-validator";

export class CreateInventoryDto{
    @IsNumber()
    @Min(0, {message:'La cantidad debe de ser mayor o igual a 0'})
    stock: number;

    @IsNumber()
    @Min(0, {message:'ID del item erroneo'})
    item_id: number;
    
}