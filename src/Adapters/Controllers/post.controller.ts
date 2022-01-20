import UserForPrologDto from '@/ApplicationServices/DTOs/normal/UsersForPrologDto';
import AddDislikeDto from '@/ApplicationServices/DTOs/Post/AddDislikeDto';
import AddLikeDto from '@/ApplicationServices/DTOs/Post/AddLikeDto';
import { CommentDto } from '@/ApplicationServices/DTOs/swagger/comment.dto';
import { CreateCommentDto } from '@/ApplicationServices/DTOs/swagger/create_comment';
import { CreatePostDto } from '@/ApplicationServices/DTOs/swagger/create_post.dto';
import { IPosts } from '@/ApplicationServices/interfaces/Post/post.interface';
import IPostService from '@/ApplicationServices/Services/Posts/IPostService';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import { toSwaggerList } from '@/utils/util';
import { Controller, Get, Post, HttpCode, UseBefore, Body, Param, Put, Delete } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/validation.middleware';

@Controller()
export class PostController {
  public postService = injector.get<IPostService>(TYPES.IPostService);

  @Get('/posts')
  @HttpCode(200)
  @OpenAPI({ summary: 'Return a list of posts' })
  async getPosts() {
    const findAllPosts: IPosts[] = await this.postService.findAllPosts();
    return { data: toSwaggerList(findAllPosts), message: 'findAll' };
  }

  @Get('/prolog')
  @HttpCode(200)
  @OpenAPI({ summary: 'Return a list of likes/dislikes of all users' })
  async getLikesDislikes() {
    const findAllData: UserForPrologDto[] = await this.postService.findAllUsersLikesDislikes();
    return toSwaggerList(findAllData);
  }

  @Get('/posts/:id')
  @HttpCode(200)
  @OpenAPI({ summary: 'Get posts created by given user id' })
  async getPostByUserId(@Param('id') userId: number) {
    const posts: IPosts[] = await this.postService.findPostsById(userId);
    if (posts === null) {
      throw { status: 500, message: 'There was an error' }
    }

    return { data: toSwaggerList(posts), message: 'returned successfully' };
  }

  @Put('/posts')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
  @OpenAPI({ summary: 'Update a Post' })
  async updatePost(@Body() postData: CreateCommentDto) {

    try {
      await this.postService.createComment(postData);
    return { message: 'Post comment added successfuly' };
    } catch (error) {
      throw { status: 500, errorMessage: error };
    }
  }

  @Post('/posts')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreatePostDto, 'body'))
  @OpenAPI({ summary: 'Create a new Post' })
  async createUser(@Body() postData: CreatePostDto) {
    const createPostData: CreatePostDto = await this.postService.createPost(postData);
    if (createPostData === null) {
      throw { status: 500, message: 'There was an error' };
    }

    return { data: toSwaggerList(createPostData), message: 'created' };
  }

  @Put('/posts/likes')
  @HttpCode(200)
  @UseBefore(validationMiddleware(AddLikeDto, 'body'))
  @OpenAPI({ summary: 'Add like to post' })
  async addLike(@Body() likeDto: AddLikeDto) {
    try {
      await this.postService.addLike(likeDto);

      return { message: 'Like successfuly added' };
    } catch (error) {
      throw { status: 500, errorMessage: error };

    }
  }

  @Put('/posts/dislikes')
  @HttpCode(200)
  @UseBefore(validationMiddleware(AddDislikeDto, 'body'))
  @OpenAPI({ summary: 'Add like to post' })
  async addDislike(@Body() dislikeDto: AddDislikeDto) {
    try {
      await this.postService.addDislike(dislikeDto);

      return { message: 'Dislike successfuly added' };
    } catch (error) {
      throw { status: 500, errorMessage: error };

    }
  }

  @Delete('/posts/likes/:id')
  @HttpCode(200)
  @OpenAPI({ summary: 'Remove a like' })
  async removeLike(@Param('id') likeId: string) {
    try {
      await this.postService.removeLike(likeId);
      return { message: 'Like removed successfully' };
    } catch (error) {
      throw { status: 500, errorMessage: error };
    }

  }
  @Delete('/posts/dislikes/:id')
  @HttpCode(200)
  @OpenAPI({ summary: 'Remove a dislike' })
  async removeDislike(@Param('id') dislikeId: string) {
    try {
      await this.postService.removeDislike(dislikeId);
      return { message: 'Dislike removed successfully' };
    } catch (error) {
      throw { status: 500, errorMessage: error };
    }

  }

}
