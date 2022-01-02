import { IsArray } from "class-validator";

export class TagsDto {

    @IsArray()
    public tags: string[];

  }
  