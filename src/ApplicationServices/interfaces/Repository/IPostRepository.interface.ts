import { CreateCommentDto } from '@/ApplicationServices/DTOs/swagger/create_comment';
import { CreatePostDto } from '@/ApplicationServices/DTOs/swagger/create_post.dto';
import Dislike from '@/Model/Posts/Dislike';
import Like from '@/Model/Posts/Like';
import Posts from '@/Model/Posts/Post';
import { IPosts } from '../Post/post.interface';

export default interface IPostRepository {
  createPost(postData: CreatePostDto): Promise<CreatePostDto>;
  updateWithComment(postData: CreateCommentDto): Promise<CreateCommentDto>;
  getAllPosts(): Promise<IPosts[]>;
  getPostByUserId(id: number): Promise<IPosts[]>;

  addLike(postId: string, like: Like);
  addDislike(postId: string, dislike: Dislike);
  removeLike(likeId: string);
  removeDislike(dislikeId: string);
  //getPostsByUser(userId: number): Promise<IPosts[]>;
}
