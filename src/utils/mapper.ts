import { Injectable } from '@nestjs/common';

import {
    CreateWorkDto,
    PreviewWorkDto,
    RemoveWorkDto,
    UpdateWorkDto,
    WorkDto,
} from '@/dto';
import { WorkEntity } from '@/entity';
import type { WorkMapper } from '@/interfaces';

@Injectable()
export class AppMapper implements WorkMapper {
    toDto(entity: WorkEntity): WorkDto {
        const dto = new WorkDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.members = entity.members.split(',');
        dto.description = entity.description;
        dto.pdf_url = entity.pdf_url;
        dto.year = entity.year;

        return dto;
    }

    toPreviewDto(entity: WorkEntity): PreviewWorkDto {
        const dto = new PreviewWorkDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.members = entity.members.split(',');
        dto.thumbnail = entity.thumbnail;
        dto.year = entity.year;

        return dto;
    }

    toEntity(dto: CreateWorkDto | UpdateWorkDto | RemoveWorkDto): WorkEntity {
        const entity = new WorkEntity();

        if (dto instanceof CreateWorkDto) {
            entity.name = dto.name;
            entity.description = dto.description;
            entity.members = dto.members.join(',');
            entity.thumbnail = dto.thumbnail.filename;
            entity.pdf_url = dto.pdf.filename;
            entity.year = dto.year;
        }

        if (dto instanceof UpdateWorkDto) {
            entity.id = dto.id;

            if (dto.name !== undefined) entity.name = dto.name;
            if (dto.description !== undefined)
                entity.description = dto.description;
            if (dto.members !== undefined)
                entity.members = dto.members.join(',');
            if (dto.thumbnail !== undefined)
                entity.thumbnail = dto.thumbnail.filename;
            if (dto.pdf !== undefined) entity.pdf_url = dto.pdf.filename;
            if (dto.year !== undefined) entity.year = dto.year;
        }

        if (dto instanceof RemoveWorkDto) {
            entity.id = dto.id;
        }

        return entity;
    }
}
