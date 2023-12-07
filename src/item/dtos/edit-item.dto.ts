import { CreateItemDto } from "./create-item.dto";
import { PartialType, OmitType } from "@nestjs/mapped-types";

// export class EditItemDto extends PartialType(
//     OmitType(CreateItemDto, ['price'] as const)
//     ) {}
export class EditItemDto extends PartialType(CreateItemDto) {}