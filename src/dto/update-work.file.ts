import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkFile } from '@/dto/create-work.file';

export class UpdateWorkFile extends PartialType(CreateWorkFile) {}
