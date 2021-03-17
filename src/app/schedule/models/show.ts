import { Genre } from '../../music/models/genre';
import { Host } from '../../profile/host';

export class Show {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    day_id: number;
    description?: string;
    image?: string;
    genres: Genre[];
    hosts: Host[];
}
