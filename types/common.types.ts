export type CommonResponse<T> = {
    name: string;
    createdAt: string;
    id: number;
    data: T;
}

export type ResponseApi<T = any> = {
  meta: META
  data: T,
}

export type META = {
  status: number;
  last_page: number;
  page: number;
  per_page: number;
  total: number;
}
