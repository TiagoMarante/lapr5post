import { CommentDto } from '@/ApplicationServices/DTOs/swagger/comment.dto';
import { CreateCommentDto } from '@/ApplicationServices/DTOs/swagger/create_comment';
import { CreatePostDto } from '@/ApplicationServices/DTOs/swagger/create_post.dto';
import { IPosts } from '@/ApplicationServices/interfaces/Post/post.interface';
import IPostRepository from '@/ApplicationServices/interfaces/Repository/IPostRepository.interface';
import Comment from '@/Model/Posts/Comment';
import { injectable } from 'inversify';
import PostsDB from '../../../Adapters/Repositories/Post/Schemas/PostSchema';
import CommentDB from '../../../Adapters/Repositories/Post/Schemas/CommentsSchema';
import { queryToMongo } from '@/utils/util';
import Dislike from '@/Model/Posts/Dislike';
import Like from '@/Model/Posts/Like';
import LikeDB from '../../../Adapters/Repositories/Post/Schemas/LikeSchema';
import DislikeDB from '../../../Adapters/Repositories/Post/Schemas/DislikeSchema';
import ILike from '@/ApplicationServices/interfaces/Post/like.interface';
import IDislike from '@/ApplicationServices/interfaces/Post/dislike.interface';
import { logger } from '@/utils/logger';


@injectable()
class PostRepository implements IPostRepository {

  /**
   * This method is exclusive for mongoDB databases, change this method if database layer needs to be changed
   * @param payload 
   * @param populator 
   * @returns 
   */
  private async getWithQueryAndPopulate(payload: JSON, populator: string): Promise<IPosts[]> {
    try {
      const result: IPosts[] = await PostsDB.find(payload).populate(populator).populate("likes").populate("dislikes").lean();
      return result;
    } catch (error) {
      return null;
    }
  }

  async getAllPosts(): Promise<IPosts[]> {
    const payload = queryToMongo(`{}`);
    const result = await this.getWithQueryAndPopulate(payload, 'comments');
    return result;
  }


  async getPostByUserId(id: number): Promise<IPosts[]> {
    const payload = queryToMongo(`{ "user": ${id} }`);
    const result = await this.getWithQueryAndPopulate(payload, 'comments');
    return result;
  }


  async createPost(postData: CreatePostDto): Promise<CreatePostDto> {
    try {
      const projectResult = await PostsDB.create(postData);
      await projectResult.save();
      return postData;
    } catch (error) {
      return null;
    }
  }

  async updateWithComment(postData: CreateCommentDto): Promise<CreateCommentDto> {
    try {
      const result = await PostsDB.findById(postData.id);

      const comment = await CommentDB.create(postData);
      comment.save();

      result.comments.push(comment);
      result.save()
    } catch (error) {
      return null;
    }
  }

  public async addLike(postId: string, like: Like) {
    const post = await PostsDB.findById(postId);
    let iLike: ILike = { _id: like.id, userId: like.User };
    const newLike = await LikeDB.create(iLike);
    await newLike.save();

    await post.likes.push(newLike);
    await post.save();

  }

  public async removeLike(likeId: string) {
    const like = await LikeDB.findById(likeId);

    if (like) {
      await PostsDB.updateOne({ likes: like }, {
        $pullAll: {
          likes: [like],
        },
      });
      await LikeDB.deleteOne({ _id: likeId });
    }
  }

  public async addDislike(postId: string, dislike: Dislike) {
    const post = await PostsDB.findById(postId);
    let iDislike: IDislike = { _id: dislike.id, userId: dislike.User };
    const newDislike = await DislikeDB.create(iDislike);
    await newDislike.save();

    await post.dislikes.push(newDislike);
    await post.save();
  }

  public async removeDislike(dislikeId: string) {
    const dislike = await DislikeDB.findById(dislikeId);

    if (dislike) {
      await PostsDB.updateOne({ dislikes: dislike }, {
        $pullAll: {
          dislikes: [dislike],
        },
      });
      await DislikeDB.deleteOne({ _id: dislikeId });
    }
  }
}



export default PostRepository;
