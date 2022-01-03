import AddDislikeDto from '@/ApplicationServices/DTOs/Post/AddDislikeDto';
import AddLikeDto from '@/ApplicationServices/DTOs/Post/AddLikeDto';
import { CreateCommentDto } from '@/ApplicationServices/DTOs/swagger/create_comment';
import { CreatePostDto } from '@/ApplicationServices/DTOs/swagger/create_post.dto';
import { IPosts } from '@/ApplicationServices/interfaces/Post/post.interface';
import IPostRepository from '@/ApplicationServices/interfaces/Repository/IPostRepository.interface';
import { injector } from '@/inversify.config';
import Dislike from '@/Model/Posts/Dislike';
import Like from '@/Model/Posts/Like';
import Posts from '@/Model/Posts/Post';
import { TYPES } from '@/types';
import { injectable } from 'inversify';
import IPostService from './IPostService';

@injectable()
class PostService implements IPostService {
  public postRepository = injector.get<IPostRepository>(TYPES.IPostRepository);


  async findAllPosts(): Promise<IPosts[]> {
    const result = await this.postRepository.getAllPosts();
    return result;
  }


  async findPostsById(id: number): Promise<IPosts[]> {
    const result = await this.postRepository.getPostByUserId(id);
    return result;
  }


  async createPost(postData: CreatePostDto): Promise<CreatePostDto> {
    const result = await this.postRepository.createPost(postData);
    return result;
  }

  async createComment(postData: CreateCommentDto){
    console.log(postData);

    await this.postRepository.updateWithComment(postData);
  }


  updatePost(postId: string, postData: Posts) {
    throw new Error('Method not implemented.');
  }
  deletePost(postId: string) {
    throw new Error('Method not implemented.');
  }

  public async addLike(likeDto: AddLikeDto) {
    try {
      const like = new Like(likeDto.userId);
      await this.postRepository.addLike(likeDto.postId, like);
    } catch (error) {
      throw "An error occured while adding the like";
    }
  }

  public async removeLike(likeId: string) {
    try {
      await this.postRepository.removeLike(likeId);
    } catch (error) {
      throw "An error occured while removing the like";
    }
  }

  public async addDislike(dislikeDto: AddDislikeDto) {
    try {
      const dislike = new Dislike(dislikeDto.userId);
      await this.postRepository.addDislike(dislikeDto.postId, dislike);
    } catch (error) {
      throw "An error occured while adding the like";
    }
  }

  public async removeDislike(dislikeId: string) {
    try {
      await this.postRepository.removeDislike(dislikeId);
    } catch (error) {
      throw "An error occured while removing the dislike";
    }
  }
}

export default PostService;
