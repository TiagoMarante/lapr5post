import { CreatePostDto } from '../ApplicationServices/DTOs/swagger/create_post.dto';
import IPostService from '../ApplicationServices/Services/Posts/IPostService';
import PostService from '../ApplicationServices/Services/Posts/PostService';
import assert from 'assert';
import MockDb from './db';


describe('Post Service', () => {
    let service: IPostService = new PostService(new MockDb());

 it('Criar post', async () => {

    const postData: CreatePostDto = {
        user: "123",
        text: "primeiro post",
        tags: ["teste1", "teste2"],
    };

    await service.createPost(postData);
    const result = await service.findAllPosts();

    //console.log("Post Created: "result);
    assert.notEqual(result, null);
    
    });


 it('Posts Findall ', async () => {
        const findAll = await service.findAllPosts();
        const size = findAll.length;

        console.log("Find All:" , findAll);
        
        expect(size > 0);
    });
});