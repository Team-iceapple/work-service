import {MemberDto} from '@/dto/member.dto';

export class WorkDto {
    id: string;
    name: string;
    members: MemberDto[];
    pdf_url: string;
    description: string;
    year: number;
}
