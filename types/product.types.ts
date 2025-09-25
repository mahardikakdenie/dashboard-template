import type { Company } from "./company.types";
import type { User } from "./user.type";

export type ProductResponse = {
    meta: {
        status: number;

    };
    data: Product[];
};

export type Product = {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    status?: 'available' | 'unavailable';
    created_at?: Date;
    image?: string;
    category?: string;
    stock?: number;
    rating?: number;
    sku?: string;
    tags?: string[];
    warranty?: string;
    color?: string;
    features?: string[];
    highlights?: string[];
    relatedProducts?: string[];
    companyId?: string;
}
