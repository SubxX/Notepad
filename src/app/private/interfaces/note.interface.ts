export interface Note {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: Date;
    pinned: boolean;
    status: number;
    attachment?: any;
}