import type {
    CreateWorkDto,
    PreviewWorkDto,
    RemoveWorkDto,
    UpdateWorkDto,
    WorkDto,
} from '@/dto';
import type { WorkEntity } from '@/entity';

export interface WorkMapper {
    toDto(entity: WorkEntity): WorkDto;
    toPreviewDto(entity: WorkEntity): PreviewWorkDto;
    toEntity(dto: CreateWorkDto | UpdateWorkDto | RemoveWorkDto): WorkEntity;
}
