export interface IApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  msgCode?: string;
}

export interface ICustomFetchParams<T> {
  path: string;
  data?: T;
  method?: string;
}
