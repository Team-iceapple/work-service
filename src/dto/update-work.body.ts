import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkBody } from '@/dto';

export class UpdateWorkBody extends PartialType(CreateWorkBody) {}
