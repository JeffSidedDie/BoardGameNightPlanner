export interface AttendeeWithScore {
    id: string;
    name: string;
    score: number | undefined;
    isSelf: boolean;
}