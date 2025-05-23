import { Injectable, Logger } from '@nestjs/common';

import type { WorkService } from '@/interfaces';
import { AppMapper } from '@/utils';
import { AppRepository } from '@/app.repository';
import type {
    CreateWorkDto,
    PreviewWorkDto,
    RemoveWorkDto,
    UpdateWorkDto,
    WorkDto,
} from '@/dto';
import { WorkNotFoundException } from '@/exceptions';

@Injectable()
export class AppService implements WorkService {
    private readonly logger = new Logger(AppService.name);

    constructor(
        private readonly mapper: AppMapper,
        private readonly repository: AppRepository,
    ) {}

    async create(createWorkDto: CreateWorkDto): Promise<void> {
        this.logger.debug('create');
        const entity = this.mapper.toEntity(createWorkDto);
        await this.repository.create(entity);
    }

    async findAll(): Promise<PreviewWorkDto[]> {
        this.logger.debug('findAll');
        const works = await this.repository.findAll();

        return works.map((work) => this.mapper.toPreviewDto(work));
    }

    async findById(id: string): Promise<WorkDto> {
        this.logger.debug('findById');
        const work = await this.repository.findById(id);

        if (!work) throw new WorkNotFoundException(id);

        return this.mapper.toDto(work);
    }

    async update(updateWorkDto: UpdateWorkDto): Promise<void> {
        this.logger.debug('update');
        const isExist = await this.repository.isExist(updateWorkDto.id);
        if (!isExist) throw new WorkNotFoundException(updateWorkDto.id);

        const entity = this.mapper.toEntity(updateWorkDto);

        await this.repository.update(entity);
    }

    async remove(removeWorkDto: RemoveWorkDto): Promise<void> {
        this.logger.debug('remove');
        const isExist = await this.repository.isExist(removeWorkDto.id);
        if (!isExist) throw new WorkNotFoundException(removeWorkDto.id);

        const entity = this.mapper.toEntity(removeWorkDto);

        await this.repository.remove(entity);
    }
}
