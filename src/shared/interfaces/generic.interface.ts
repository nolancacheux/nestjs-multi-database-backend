export interface ResponseInterface<T> {
    data: T;
    message: string;
    statusCode: number;
  }
  
  export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }
  