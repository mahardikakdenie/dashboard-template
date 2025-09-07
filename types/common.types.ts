export type CommonResponse<T> = {
    name: string;
    createdAt: string;
    id: number;
    datas: T;
}
