import { Controller, Get, Param, Patch, Delete, Post, Body, ParseIntPipe, UploadedFile, UseInterceptors, UseGuards, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CreateItemDto, EditItemDto } from './dtos';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { AppResource } from '../app.roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Extensiones permitidas
            cb(null, true);
        } else {
            // Rechazar archivo
            cb(new HttpException(`El formato ${extname(file.originalname)} no pertenece a una imagen, utilice formatos compatibles como jpeg,jpg,png`, HttpStatus.BAD_REQUEST), false);
        }

    },
    limits: {
        fileSize: 10000000,
    },
    storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
            const name = file.originalname.split('.')[0];
            const extension = extname(file.originalname);
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${name}-${randomName}${extension}`);
        },
    })
}

@ApiTags('Items')
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }
    @Get()
    async getAll() {
        const items = await this.itemService.getMany();
        return items;
    }


    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.itemService.getOne(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async imagen(@Body() dataform, @UploadedFile() file: Express.Multer.File, @Res({ passthrough: true }) res) {

        if (!dataform?.name || dataform?.name.length < 2) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un nombre con al menos 2 caracteres` });
        if (!dataform?.desc || dataform?.desc.length < 2) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer una descripción con al menos 2 caracteres` });
        if (!dataform?.price || parseFloat(dataform?.price) <= 0.0) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un precio detal de al menos 0.1` });
        if (!dataform?.wholesale_price || parseFloat(dataform?.wholesale_price) <= 0.0) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un precio al mayor que sea mayor a 0.1` });
        if (parseFloat(dataform?.wholesale_price) > parseFloat(dataform?.price)) return res.status(HttpStatus.BAD_REQUEST).json({ message: `El precio al mayor no puede ser superior al precio al detal` });
        const itemDto: CreateItemDto = {
            name: dataform?.name,
            price: parseFloat(dataform?.price),
            image: `/images/${file?.filename}`,
            desc: dataform?.desc,
            wholesale_price: parseFloat(dataform?.wholesale_price)
        }

        if (!itemDto.image) itemDto.image = "item_default.png";

        await this.itemService.findOneByName(dataform.name);
        return await this.itemService.create(itemDto);
    }
    @Auth()
    @Post('normal')
    async create(@Body() dto: CreateItemDto) {
        console.log(dto);
        await this.itemService.findOneByName(dto.name);
        return await this.itemService.create(dto);
    }

    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.ITEM
        }
    )
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() dataform,
        @UploadedFile() file: Express.Multer.File,
        @Res({ passthrough: true }) res) {
        if (!dataform?.name || dataform?.name.length < 2) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un nombre con al menos 2 caracteres` });
        if (!dataform?.desc || dataform?.desc.length < 2) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer una descripción con al menos 2 caracteres` });
        if (!dataform?.price || parseFloat(dataform?.price) < 0.1) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un precio detal de al menos 0.1` });
        if (!dataform?.wholesale_price || parseFloat(dataform?.wholesale_price) < 0.1) return res.status(HttpStatus.BAD_REQUEST).json({ message: `Debes proveer un precio al mayor que sea mayor a 0.1` });
        if (parseFloat(dataform?.wholesale_price) > parseFloat(dataform?.price)) return res.status(HttpStatus.BAD_REQUEST).json({ message: `El precio al mayor no puede ser superior al precio al detal` });
        const itemDto: CreateItemDto = {
            name: dataform?.name,
            price: parseFloat(dataform?.price),
            image: `/images/${file?.filename}`,
            desc: dataform?.desc,
            wholesale_price: parseFloat(dataform?.wholesale_price)
        }

        if (!itemDto.image) itemDto.image = "item_default.png";

        await this.itemService.findOneByName(dataform.name);
        await this.itemService.edit(id, itemDto);


    }

    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.ITEM
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.itemService.delete(id);
    }
}
