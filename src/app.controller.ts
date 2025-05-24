import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param, ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import type { GetDetailWorkResponse, GetWorksResponse } from '@/responses';
import {
    CreateWorkBody,
    CreateWorkDto,
    CreateWorkFile,
    RemoveWorkDto,
    UpdateWorkBody,
    UpdateWorkDto,
    UpdateWorkFile,
} from '@/dto';

@Controller('works')
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(private readonly service: AppService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<GetWorksResponse> {
        this.logger.debug('findAll');
        const works = await this.service.findAll();

        return {
            works,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<GetDetailWorkResponse> {
        this.logger.debug('findById');
        const work = await this.service.findById(id);

        return {
            work,
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWorkBody: CreateWorkBody) {
        this.logger.debug('create');
        const files = new CreateWorkFile();

        files.pdf = {
            path: 'example1.pdf',
        } as Express.Multer.File;

        files.thumbnail = {
            path: 'thumnail4.jpg',
        } as Express.Multer.File;

        const dto = new CreateWorkDto(createWorkBody, files);

        await this.service.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateWorkBody: UpdateWorkBody,
    ) {
        this.logger.debug('update');

        const files = new UpdateWorkFile();
        files.pdf = {
            path: 'example1.pdf',
        } as Express.Multer.File;

        files.thumbnail = {
            path: 'thumnail4.jpg',
        } as Express.Multer.File;

        const dto = new UpdateWorkDto(id, updateWorkBody, files);

        await this.service.update(dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        this.logger.debug('remove');
        const dto = new RemoveWorkDto(id);

        await this.service.remove(dto);
    }
}
