import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateWorkFile, UpdateWorkFile } from '@/dto';

@Injectable()
export class UpdateWorkFileValidationPipe implements PipeTransform {
    transform(value: UpdateWorkFile): UpdateWorkFile {
        const thumbnail = value.thumbnail ? value.thumbnail[0] : undefined;
        const pdf = value.pdf ? value.pdf[0] : undefined;

        return {
            thumbnail,
            pdf,
        };
    }
}
