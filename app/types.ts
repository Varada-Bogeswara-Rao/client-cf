// app/types.ts
export type Campaign = {
    id: number;
    owner: string;
    goal: string;
    pledged: string;
    deadline: number;
    withdrawn: boolean;
    title?: string;        // convenience at root level
    description?: string;  // convenience at root level
    image?: string;        // convenience at root level
    metadata: {
        title?: string;
        description?: string;
        image?: string;
        [key: string]: any;
    };
};
