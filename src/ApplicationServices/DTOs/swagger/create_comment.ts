import { IsNumber, IsArray, IsString } from "class-validator";

export class CreateCommentDto {
    
    @IsString()
    public id: string;

    @IsString()
    public text: string;

    @IsNumber()
    public user: number;

    @IsArray()
    public tags: string[];
  
  }
  