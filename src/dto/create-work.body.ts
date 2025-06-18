import {plainToInstance, Transform, Type} from 'class-transformer';
import {IsArray, IsNumber, IsString, Length, MinLength, ValidateNested} from 'class-validator';
import {MemberDto} from '@/dto/member.dto';

export class CreateWorkBody {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @Length(1, 255)
    team_name: string;

    @Transform(({ value }) => {
        try {
            return plainToInstance(MemberDto, JSON.parse(value));
        } catch {
            return [];
        }
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MemberDto)
    members: MemberDto[];

    @IsString()
    description: string;

    @Type(() => Number)
    @IsNumber()
    year: number;
}
