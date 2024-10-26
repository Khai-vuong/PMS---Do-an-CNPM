// page.dto.ts


  export class TaskReturnDTO {
    name : string;
    description : string;
    assignee : string;
    constructor(name: string, description: string, assignee: string) {
        this.name = name;
        this.description = description;
        this.assignee = assignee;
    }
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