import { Injectable, Logger } from '@nestjs/common';
import { Kysely } from 'kysely';
import { InjectKysely } from 'nestjs-kysely';

import { Database } from '@/database';
import type { WorkEntity } from '@/entity';
import type { WorkRepository } from '@/interfaces';

@Injectable()
export class AppRepository implements WorkRepository {
    private readonly logger = new Logger(AppRepository.name);

    constructor(@InjectKysely() private readonly db: Kysely<Database>) {}

    async create(entity: WorkEntity): Promise<void> {
        this.logger.debug('create');
        await this.db.insertInto('work').values(entity).execute();
    }

    async findAll(): Promise<WorkEntity[]> {
        this.logger.debug('findAll');
        return this.db.selectFrom('work').selectAll().execute();
    }

    async findById(id: string): Promise<WorkEntity | null> {
        this.logger.debug('findById');

        return (
            (await this.db
                .selectFrom('work')
                .selectAll()
                .where('id', '=', id)
                .executeTakeFirst()) ?? null
        );
    }

    async isExist(id: string): Promise<boolean> {
        this.logger.debug('isExist');

        const result = await this.db
            .selectFrom('work')
            .select((eb) =>
                eb
                    .exists(
                        eb.selectFrom('work').select('id').where('id', '=', id),
                    )
                    .as('exists'),
            )
            .executeTakeFirst();

        return Boolean(result?.exists);
    }

    async remove(entity: WorkEntity): Promise<void> {
        this.logger.debug('remove');

        await this.db.deleteFrom('work').where('id', '=', entity.id).execute();
    }

    async update(entity: WorkEntity): Promise<void> {
        this.logger.debug('update');

        await this.db
            .updateTable('work')
            .set(entity)
            .where('id', '=', entity.id)
            .execute();
    }
}
