import { Controller, Get, Param, Patch, Delete, Post, Body, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource, AppRoles } from '../app.roles';
import { Auth, User } from '../common/decorators';
import { CreateUserDto, EditUserDto, UserRegistration, EditClientDTO, CreateUserDtoPass } from './dtos/';
import { User as UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control'

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
        ){}
    @Get()
    async getAll(){
        return this.userService.getMany();
    }
	@Get('delivery')
    async getDeliveryUsers(){
        return this.userService.getDeliveryUsers();
    }
    
    @Auth()
    @Get('profile')
    async getInfo(@User() user){
        return {data: user}
    }
	
	@Auth(
        {
            possession: 'own',
            action: 'read',
            resource: AppResource.USER,
        }
    )
    @Patch('/profile')
    async editUser(
        @Body() dto:EditClientDTO,
        @User() userLogged: UserEntity
    ){
        let data;
        data = await this.userService.edit(userLogged.id, dto, userLogged);
        return {"Usuario: editado:": data}
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.getOne(id);
        if(!user) throw new NotFoundException('El Usuario no existe');
        return {user: user}
    }
    @Auth()
    @Post()
    async create(@Body() dto:CreateUserDto){
        const user = await this.userService.findOne(dto.email);
        if(user) throw new BadRequestException('Ese correo ya ha sido registrado');
        const result = await this.userService.create(dto);
        return {message: `Usuario: ${dto.firstname} ${dto.lastname} creado`, data: result}
    }

    @Post('register')
    async registration(@Body() dto: UserRegistration) {
	  const user = await this.userService.findOne(dto.email);
      if(user) throw new BadRequestException('Ese correo ya ha sido registrado');
      const data = await this.userService.create({
        ...dto,
        roles: [AppRoles.CLIENT],
      });
      return { message: 'Usuario registrado', data };
    }
    
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.USER
        }
    )
    @Patch(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto:CreateUserDto,
        @User() userLogged: UserEntity
    ){
        let data;
        if(this.rolesBuilder.can(userLogged.roles).updateAny(AppResource.USER).granted){
            const result = await this.userService.edit(id, dto);
            return {message: `Usuario editado`, data:result}
        }else{
            const { roles, ...rest } = dto;
            data = await this.userService.edit(id, rest, userLogged);
            return {message:'Usuario editado',data}
        }
    }
    @Patch('/edit/:id')
    async editUserWithoutPass(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto:CreateUserDtoPass,
        @User() userLogged: UserEntity
    ){
        let data;
        if(this.rolesBuilder.can(userLogged.roles).updateAny(AppResource.USER).granted){
            const result = await this.userService.edit(id, dto);
            return {message: `Usuario editado`, data:result}
        }else{
            const { roles, ...rest } = dto;
            data = await this.userService.edit(id, rest, userLogged);
            return {message:'Usuario editado',data}
        }
    }
    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.USER
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.getOne(id);
        if(!user) throw new NotFoundException('El Usuario no existe');
        this.userService.delete(id);
        return {message: `El usuario: ha sido borrado`}
    }
}
