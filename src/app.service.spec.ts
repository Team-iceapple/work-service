import { Test, type TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';

import { AppRepository } from '@/app.repository';
import { AppService } from '@/app.service';
import {
    CreateWorkBody,
    CreateWorkDto,
    CreateWorkFile,
    PreviewWorkDto,
    RemoveWorkDto,
    UpdateWorkBody,
    UpdateWorkDto,
    UpdateWorkFile,
    WorkDto,
} from '@/dto';
import { WorkEntity } from '@/entity';
import { WorkNotFoundException } from '@/exceptions';
import { AppMapper, FileManager } from '@/utils';

describe('AppService', () => {
    let service: AppService;
    let repository: MockProxy<AppRepository>;
    let mapper: AppMapper;
    let fileManager: MockProxy<FileManager>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AppService, AppRepository, AppMapper, FileManager],
        })
            .overrideProvider(AppRepository)
            .useValue(mock<AppRepository>())
            .overrideProvider(FileManager)
            .useValue(mock<FileManager>())
            .compile();

        service = app.get(AppService);
        repository = app.get(AppRepository);
        mapper = app.get(AppMapper);
    });

    describe('findAll', () => {
        it('PreviewWorkDto 목록을 반환한다.', async () => {
            const workEntities: WorkEntity[] = [
                {
                    id: 'uuid1',
                    name: 'name1',
                    members: 'member1,member2',
                    thumbnail: 'thumbnail1',
                    pdf_url: 'pdf_url',
                    description: 'description',
                    created_at: new Date('2024'),
                    year: 2025,
                },
            ];

            const expected: PreviewWorkDto[] = [
                {
                    id: 'uuid1',
                    name: 'name1',
                    members: ['member1', 'member2'],
                    thumbnail: 'thumbnail1',
                    year: 2025,
                },
            ];

            const mockFindAll =
                repository.findAll.mockResolvedValue(workEntities);

            const actual = await service.findAll();

            expect(actual).toEqual(expected);
            expect(mockFindAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('findById', () => {
        it('WorkDto를 반환한다.', async () => {
            const id = 'uuid1';

            const work: WorkEntity = {
                id: 'uuid1',
                name: 'name1',
                members: 'member1,member2',
                thumbnail: 'thumbnail1',
                pdf_url: 'pdf_url',
                description: 'description',
                created_at: new Date('2024'),
                year: 2025,
            };

            const expected: WorkDto = {
                id: 'uuid1',
                name: 'name1',
                members: ['member1', 'member2'],
                pdf_url: 'pdf_url',
                description: 'description',
                year: 2025,
            };

            const mockFindById = repository.findById.mockResolvedValue(work);

            const actual = await service.findById(id);

            expect(actual).toEqual(expected);
            expect(mockFindById).toHaveBeenCalledWith(id);
            expect(mockFindById).toHaveBeenCalledTimes(1);
        });
    });

    describe('create', () => {
        it('AppRepository.create를 호출한다.', async () => {
            const createWorkBody: CreateWorkBody = {
                name: 'name',
                description: 'description',
                members: ['member'],
                year: 2025,
            };

            const createWorkFile: CreateWorkFile = {
                thumbnail: mock<Express.Multer.File>(),
                pdf: mock<Express.Multer.File>(),
            };

            const createWorkDto: CreateWorkDto = new CreateWorkDto(
                createWorkBody,
                createWorkFile,
            );

            const workEntity = mapper.toEntity(createWorkDto);

            const mockCreate = repository.create.mockResolvedValue();

            await service.create(createWorkDto);

            expect(mockCreate).toHaveBeenCalledWith(workEntity);
            expect(mockCreate).toHaveBeenCalledTimes(1);
        });
    });

    describe('update', () => {
        it('존재하지 않는 ID를 수정하려고 하는 경우 WorkNotFoundException을 던진다.', async () => {
            const id = 'uuid1';

            const removeWorkDto: RemoveWorkDto = {
                id,
            };

            const mockRemove = repository.remove.mockResolvedValue();
            repository.isExist.mockResolvedValue(false);

            await expect(service.remove(removeWorkDto)).rejects.toThrow(
                WorkNotFoundException,
            );
            expect(mockRemove).toHaveBeenCalledTimes(0);
        });

        it('수정 성공 시 AppRepository.update를 호출한다.', async () => {
            const id = 'uuid1';

            const updateWorkBody: UpdateWorkBody = {
                name: 'updated name',
                description: 'updated description',
                members: ['updated member'],
                year: 2026,
            };

            const updateWorkFile: UpdateWorkFile = {
                thumbnail: mock<Express.Multer.File>(),
                pdf: mock<Express.Multer.File>(),
            };

            const updateWorkDto: UpdateWorkDto = new UpdateWorkDto(
                id,
                updateWorkBody,
                updateWorkFile,
            );

            const workEntity = mapper.toEntity(updateWorkDto);

            const mockUpdate = repository.update.mockResolvedValue();
            repository.findById.mockResolvedValue(new WorkEntity());

            await service.update(updateWorkDto);

            expect(mockUpdate).toHaveBeenCalledWith(workEntity);
            expect(mockUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe('remove', () => {
        it('존재하지 않는 ID를 삭제하려고 하는 경우 WorkNotFoundException을 던진다.', async () => {
            const id = 'uuid1';

            const removeWorkDto: RemoveWorkDto = {
                id,
            };

            const mockRemove = repository.remove.mockResolvedValue();
            repository.findById.mockResolvedValue(null);

            await expect(service.remove(removeWorkDto)).rejects.toThrow(
                WorkNotFoundException,
            );
            expect(mockRemove).toHaveBeenCalledTimes(0);
        });

        it('삭제 성공시 AppRepository.remove를 호출한다.', async () => {
            const id = 'uuid1';

            const removeWorkDto: RemoveWorkDto = {
                id,
            };

            const workEntity = mapper.toEntity(removeWorkDto);

            const mockRemove = repository.remove.mockResolvedValue();
            repository.findById.mockResolvedValue(new WorkEntity());

            await service.remove(removeWorkDto);

            expect(mockRemove).toHaveBeenCalledWith(workEntity);
            expect(mockRemove).toHaveBeenCalledTimes(1);
        });
    });
});
