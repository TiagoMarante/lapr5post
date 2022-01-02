import { IsNumber, IsArray, IsString } from "class-validator";

export class CommentDto {

    @IsString()
    public _text: string;

    @IsNumber()
    public _user: number;

    @IsArray()
    public _tags: string[];
  

    public constructor(text: string, user: number, tags?: string[]) {
      this._user = user;
      this._text = text;
      this._tags = tags;
  }
  }
  