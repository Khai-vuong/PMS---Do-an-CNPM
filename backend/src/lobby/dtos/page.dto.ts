// page.dto.ts

import { Optional } from "@nestjs/common";
import { IS_BOOLEAN, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";




  export class TaskReturnDTO {
    @IsString()
    name : string;
    @IsString()
    description : string;
    @IsOptional()
    @IsString()
    assignee : string;
    constructor(name: string, description: string, assignee: string) {
        this.name = name;
        this.description = description;
        this.assignee = assignee;
    }
  }
  export class PageMetaDTO {
    @IsNumber()
    pageCount: number;
    @IsNumber()
    pageSize: number;
    @IsNumber()
    currentPage: number;
    @IsBoolean()
    hasPreviousPage: boolean;
    @IsBoolean()
    hasNextPage: boolean;
}
  
  export class PageDTO<T> {
    @IsOptional()
    @IsArray()
    data: T[];
    metadata: PageMetaDTO;
    constructor(data: T[], metadata: PageMetaDTO) {
        this.data = data;
        this.metadata = metadata;
    }
}
export class InitLobbyDTO {
    @IsString()  
    username: string;
    @IsString()
    role: 'Project manager' | 'Member';
    @IsString()
    pname: string;
    @IsString()
    pdescription: string;
    @IsString()
    pmodel: string;
    @IsString()
    pphase: string;
    PageDTO: PageDTO<TaskReturnDTO>;  
    constructor(username: string, role: 'Project manager' | 'Member', pname: string, pdescription: string, pmodel: string, pphase: string, PageDTO: PageDTO<TaskReturnDTO>) {
        this.username = username;
        this.role = role;
        this.pname = pname;
        this.pdescription = pdescription;
        this.pmodel = pmodel;
        this.pphase = pphase;
        this.PageDTO = PageDTO;
        
    }
}