import { CreateUserDto } from "./create-user.dto";
import { OmitType } from "@nestjs/mapped-types";


export class UserRegistration extends OmitType(CreateUserDto, [
      'roles',
] as const) {}

export class EditClientDTO extends OmitType(CreateUserDto, [
      'roles','email',
] as const) {}