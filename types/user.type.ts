import type { Company } from "./company.types";
import type { Menus } from "./Menus";

export type UserType = 'active' | 'inactive' | 'pending';

export type Role = {
    id: string;
    name: String;
    created_at?: string;
    created_by?: string;
    description?: string;
    userCreated?: User;
    companyId?: string;
    company?: Company;
    menus?: Menus[];
}

export type User = {
    id: string;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    status?: UserType;
    created_at?: Date;
    avatar?: string;
    password?: string;
    roleId?: String;
    role?: Role;
    plan?: string;
    company?: Company;
    companyId?: string;
    country?: string;
    contact?: string;
    currentPlan?: string;
    billing?: string;
}

export type UserTable = {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    role?: string;
    phone?: string;
    status?: UserType;
    actions?: null;
}
