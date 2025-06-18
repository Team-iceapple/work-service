import { Injectable } from '@nestjs/common';

import {
    CreateWorkDto,
    PreviewWorkDto,
    UpdateWorkDto,
    WorkDto,
} from '@/dto';
import type { WorkMapper } from '@/interfaces';
import {InsertWork, SelectWork} from '@/database/table';

@Injectable()
export class AppMapper implements WorkMapper {
    toDto(entity: SelectWork): WorkDto {
        const dto = new WorkDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.members = entity.members;
        dto.description = entity.description;
        dto.pdf_url = entity.pdf_url;
        dto.year = entity.year;

        return dto;
    }

    toPreviewDto(entity: SelectWork): PreviewWorkDto {
        const dto = new PreviewWorkDto();

        dto.id = entity.id;
        dto.name = entity.name;
        dto.members = entity.members;
        dto.thumbnail = entity.thumbnail;
        dto.year = entity.year;

        return dto;
    }

    toInsert(dto: CreateWorkDto): InsertWork {
        return {
            name: dto.name,
            description: dto.description,
            members: JSON.stringify(dto.members),
            thumbnail: dto.thumbnail.filename,
            pdf_url: dto.pdf.filename,
            year: dto.year,
        }
    }

    toUpdate(dto: UpdateWorkDto) {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            members: JSON.stringify(dto.members),
            thumbnail: dto.thumbnail?.filename,
            pdf_url: dto.pdf?.filename,
            year: dto.year,
        }
    }
}
