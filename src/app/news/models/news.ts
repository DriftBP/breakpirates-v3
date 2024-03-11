export interface News {
    id: number;
    date: string;
    title: string;
    text: string;
    summary: string;
    image: string | null;
    added_by: string;
}
