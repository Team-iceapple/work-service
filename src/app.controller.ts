import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseFilePipe,
    ParseUUIDPipe,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
    CreateWorkFileValidationPipe,
    UpdateWorkFileValidationPipe,
} from '@/pipe';
import { FormDataOnlyGuard } from '@/guard';
import { getWorkFileFields } from '@/utils';

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
    async findById(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<GetDetailWorkResponse> {
        this.logger.debug('findById');
        const work = await this.service.findById(id);

        return {
            work,
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(FormDataOnlyGuard)
    @UseInterceptors(FileFieldsInterceptor(getWorkFileFields()))
    async create(
        @Body() createWorkBody: CreateWorkBody,
        @UploadedFiles(new CreateWorkFileValidationPipe())
        creatWorkFile: CreateWorkFile,
    ) {
        this.logger.debug('create');
        this.logger.debug(creatWorkFile);

        const dto = new CreateWorkDto(createWorkBody, creatWorkFile);

        await this.service.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(FormDataOnlyGuard)
    @UseInterceptors(FileFieldsInterceptor(getWorkFileFields()))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateWorkBody: UpdateWorkBody,
        @UploadedFiles(new UpdateWorkFileValidationPipe())
        updateWorkFile: UpdateWorkFile,
    ) {
        this.logger.debug('update');

        const dto = new UpdateWorkDto(id, updateWorkBody, updateWorkFile);

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
