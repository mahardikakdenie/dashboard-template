export type UserType = 'active' | 'inactive' | 'pending';
export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    status: UserType;
    created_at: Date;
    avatar: string;
    password?: string;
    role?: string;
    plan?: string;
    company?: string;
    companyId: number;
    country?: string;
    contact?: string;
    currentPlan?: string;
    billing?: string;
}

export type UserTable = {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    status?: UserType;
    actions?: null;
}
