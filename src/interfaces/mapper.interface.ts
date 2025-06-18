import type {
    CreateWorkDto,
    PreviewWorkDto,
    UpdateWorkDto,
    WorkDto,
} from '@/dto';
import {InsertWork, SelectWork, UpdateWork} from '@/database/table';

export interface WorkMapper {
    toDto(select: SelectWork): WorkDto;
    toPreviewDto(select: SelectWork): PreviewWorkDto;
    toInsert(dto: CreateWorkDto): InsertWork;
    toUpdate(dto: UpdateWorkDto): UpdateWork;
}
