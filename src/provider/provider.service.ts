import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';


@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>){}
    async getMany(): Promise<Provider[]>{
        return await this.providerRepository.find();
    }
    async getOne(id: number): Promise<Provider>{
        const provider = await this.providerRepository.findOne({where:{id:id}})
        if(!provider) throw new NotFoundException('El Proveedor no existe');
        return provider;
    }
    async findOneByEmail(email: string): Promise<Provider>{
        const provider = await this.providerRepository.findOne({where:{email:email}})
        if(provider) throw new BadRequestException('Ya existe el correo de ese proveedor');
        return provider;
    }
    async findOneByName(name: string): Promise<Provider>{
        const provider = await this.providerRepository.findOne({where:{name:name}})
        if(provider) throw new BadRequestException('Ya existe un proveedor con ese nombre');
        return provider;
    }
    async edit(id: number, dto: CreateProviderDto){
        const provider = await this.getOne(id);
        const editedClient = Object.assign(provider, dto);
        return await this.providerRepository.save(editedClient);
    }
    async create(dto: CreateProviderDto){
        const provider = this.providerRepository.create(dto);
        return await this.providerRepository.save(provider);
    }
    async delete(id: number){
        const provider = await this.getOne(id)
        return await this.providerRepository.delete(id)
    }

    async getCount(){
        return await this.providerRepository.count();
    }
}
