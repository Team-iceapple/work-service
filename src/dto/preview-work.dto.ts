import {MemberDto} from '@/dto/member.dto';

export class PreviewWorkDto {
    id: string;
    name: string;
    members: MemberDto[];
    thumbnail: string;
    year: number;
}
