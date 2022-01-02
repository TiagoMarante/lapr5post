import { IsNumber, IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  public user: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CommentDto)
  // public comments: CommentDto[];

  @IsString()
  public text: string;

  @IsArray()
  public tags: string[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // public likes: Like[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // public dislikes: Dislike[];
}
