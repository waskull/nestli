import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateInventoryDto } from "./create-inventory.dto";

export class EditInventoryDto extends PartialType(OmitType(CreateInventoryDto, ['item_id'] as const)) {}