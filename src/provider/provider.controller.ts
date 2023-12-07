import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from '../app.roles';
import { Auth } from '../common/decorators';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dtos/create-provider.dto';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
    constructor(
        private providerService: ProviderService,
    ){}
    @Get()
    async getAll(){
        return await this.providerService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id') id: number){
        return await this.providerService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.PROVIDER
        }
    )
    @Post()
    async create(@Body() dto: CreateProviderDto){
        const asd = await this.providerService.findOneByName(dto.name);
        const provider = await this.providerService.create(dto);
        return {message:"Proveedor creado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.PROVIDER
        }
    )
    @Patch(':id')
    async edit(@Param('id') id: number, @Body() dto: CreateProviderDto){
        const provider = await this.providerService.edit(id,dto);
        return {message:"Proveedor editado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.PROVIDER
        }
    )
    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.providerService.delete(id);
        return {message:"Proveedor eliminado"}
    }
}
