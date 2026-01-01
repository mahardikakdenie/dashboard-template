import type { User } from "./user.type";

export type Status = 'active' | 'inactive' | 'pending'

export type Company = {
    id: string;
    name: string;
    email?: string;
    status: string;
    created_at: Date | string;
    description?: string;
    industry?: string;
    website?: string;
    owner?: User;
    members?: User[];
    url: string;
};
