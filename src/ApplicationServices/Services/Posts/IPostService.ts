import UserForPrologDto from '@/ApplicationServices/DTOs/normal/UsersForPrologDto';
import AddDislikeDto from '@/ApplicationServices/DTOs/Post/AddDislikeDto';
import AddLikeDto from '@/ApplicationServices/DTOs/Post/AddLikeDto';
import { CreateCommentDto } from '@/ApplicationServices/DTOs/swagger/create_comment';
import { CreatePostDto } from '@/ApplicationServices/DTOs/swagger/create_post.dto';
import { IPosts } from '@/ApplicationServices/interfaces/Post/post.interface';
import Posts from '@/Model/Posts/Post';

export default interface IPostService {
  findAllPosts(): Promise<IPosts[]>;
  findPostsById(id: number): Promise<IPosts[]>;
  createPost(postData: CreatePostDto): Promise<CreatePostDto>;
  updatePost(postId: string, postData: Posts);
  deletePost(postId: string);
  createComment(postData: CreateCommentDto);

  addLike(likeDto: AddLikeDto);
  addDislike(dislikeDto: AddDislikeDto);

  removeLike(likeId: string);
  removeDislike(dislikeId: string);

  findAllUsersLikesDislikes(): Promise<UserForPrologDto[]>
}
