import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateWorkBody {
    @IsString()
    @Length(1, 255)
    name: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) return parsed;
                return [value];
            } catch {
                return value.split(',');
            }
        }
        return value;
    })
    @IsString({ each: true })
    members: string[];

    @IsString()
    description: string;

    @Type(() => Number)
    @IsNumber()
    year: number;
}
