import { Generated } from 'kysely';

export interface WorkTable {
    id: Generated<string>;

    name: string;

    members: string;

    thumbnail: string;

    pdf_url: string;

    description: string;

    year: number;

    created_at: Date;
}
