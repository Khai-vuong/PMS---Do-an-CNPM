// page.dto.ts

export class PageParamDTO {
    currentPage: number = 1;
    pageSize: number = 5;
}
  
  export class PageMetaDTO {
    pageCount: number;
    pageSize: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
  
  export class PageDTO<T> {
    data: T[];
    metadata: PageMetaDTO;
}