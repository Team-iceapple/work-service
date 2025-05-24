import {IsNumber, IsString, Length} from 'class-validator';

export class CreateWorkBody {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString({ each: true })
    members: string[];

    @IsString()
    description: string;

    @IsNumber()
    year: number;
}
