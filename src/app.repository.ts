import { Injectable, Logger } from '@nestjs/common';

import type { WorkEntity } from '@/entity';
import type { WorkRepository } from '@/interfaces';

@Injectable()
export class AppRepository implements WorkRepository {
    private readonly logger = new Logger(AppRepository.name);

    private db: WorkEntity[] = [
        {
            id: 'ce04db26-7639-44f4-bffe-cd14f9b06dea',
            name: 'AI 기반 드론 제어 시스템',
            members: '김지훈,이서연,박민준',
            thumbnail: '/thumbnail1.jpg',
            pdf_url: '/paper1.pdf',
            description: 'AI 알고리즘을 이용한 자율 드론 제어 시스템 개발',
            year: 2023,
            created_at: new Date('2023-11-15T10:00:00Z'),
        },
        {
            id: '4d459dfe-b57c-4c28-9da1-36aef604e7d8',
            name: '스마트 헬스케어 플랫폼',
            members: '정예린,한도현',
            thumbnail: '/thumbnail2.jpg',
            pdf_url: '/paper2.pdf',
            description:
                '사용자 생체 데이터를 기반으로 개인 맞춤형 건강 관리 시스템',
            year: 2024,
            created_at: new Date('2024-05-10T15:30:00Z'),
        },
        {
            id: '11f4dfd5-e3a6-4057-a2a5-d3e83398ab14',
            name: '에너지 효율 최적화 시스템',
            members: '오세훈,장하영,배민수',
            thumbnail: '/thumbnail3.jpg',
            pdf_url: '/paper3.pdf',
            description:
                '산업용 설비에서의 에너지 소비 최적화를 위한 IoT 기반 시스템',
            year: 2022,
            created_at: new Date('2022-09-21T08:45:00Z'),
        },
    ];

    async create(entity: WorkEntity): Promise<void> {
        this.logger.debug('create');
        entity.id = '59f0066e-b323-48d4-9eea-3ac7536778ad';

        this.db.push(entity);
    }

    async findAll(): Promise<WorkEntity[]> {
        this.logger.debug('findAll');
        return this.db;
    }

    async findById(id: string): Promise<WorkEntity | null> {
        this.logger.debug('findById');
        return this.db.find((e) => e.id === id) ?? null;
    }

    async isExist(id: string): Promise<boolean> {
        this.logger.debug('isExist');
        return this.db.findIndex((e) => e.id === id) !== -1;
    }

    async remove(entity: WorkEntity): Promise<void> {
        this.logger.debug('remove');
        this.db = this.db.filter((e) => e.id !== entity.id);
    }

    async update(entity: WorkEntity): Promise<void> {
        this.logger.debug('update');
        const target = await this.findById(entity.id);

        if (target === null) throw new Error('Entity Not Found');

        const index = this.db.findIndex((e) => e.id === target.id);

        this.db[index] = {
            ...this.db[index],
            ...entity,
        };
    }
}
