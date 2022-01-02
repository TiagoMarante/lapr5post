import Text from '@/Model/Posts/Text';
import Tag from '@/Model/Shared/Tag';
import { IComment } from './comment.interface';
import IDislike from './dislike.interface';
import ILike from './like.interface';

export interface IPosts {
  _id: string;
  user: number;
  comments: IComment[];
  likes: ILike[];
  dislikes: IDislike[];
  tags: Tag[];
  text: Text;
}
