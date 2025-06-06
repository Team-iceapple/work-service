import type { WorkEntity } from '@/entity';

export interface WorkRepository {
    findAll(): Promise<WorkEntity[]>;
    findById(id: string): Promise<WorkEntity | null>;
    isExist(id: string): Promise<boolean>;
    create(entity: WorkEntity): Promise<void>;
    update(entity: WorkEntity): Promise<void>;
    remove(entity: WorkEntity): Promise<void>;
}
