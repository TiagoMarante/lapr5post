import { CreateCommentDto } from "../ApplicationServices/DTOs/swagger/create_comment";
import { CreatePostDto } from "../ApplicationServices/DTOs/swagger/create_post.dto";
import { IPosts } from "../ApplicationServices/interfaces/Post/post.interface";
import IPostRepository from "../ApplicationServices/interfaces/Repository/IPostRepository.interface";
import Dislike from "../Model/Posts/Dislike";
import Like from "../Model/Posts/Like";
import Posts from "../Model/Posts/Post";
import Text from "../Model/Posts/Text";
import Tag from "../Model/Shared/Tag";

export default class MockDb implements IPostRepository {

    postMock: Posts[] = [];
    

    createPost(postData: CreatePostDto): Promise<CreatePostDto> {
        let tagsMock: Tag[] = [];
        postData.tags.forEach((elems) => tagsMock.push(new Tag(elems)));

        this.postMock.push(new Posts(parseInt(postData.user), tagsMock , new Text(postData.text)));

        

        return;
        
    }
    
    updateWithComment(postData: CreateCommentDto): Promise<CreateCommentDto> {
        throw new Error("Method not implemented.");
    }

    async getAllPosts(): Promise<IPosts[]> {
        let arrP : IPosts[] = [];

        let postI: IPosts = {
            _id: "123",
            user: 12,
            comments: [],
            likes: [],
            dislikes: [],
            tags: Tag["teste1"],
            text: new Text("boas")
        };

        this.postMock.map((elem, key) => {postI._id = key.toString(), postI.comments = [], 
            postI.dislikes = [], postI.likes = [], postI.tags = elem.tags, postI.text = elem.text, 
            postI.user = elem.user, arrP.push(postI)});
        
        return arrP;
    }

    async getPostByUserId(id: number): Promise<IPosts[]> {
        const result = this.postMock.forEach((elem) => {
            if(elem.user == id){
                return elem;
            }
        });

        let arrP : IPosts[] = [];
        return arrP;
    }


    addLike(postId: string, like: Like) {
        throw new Error("Method not implemented.");
    }
    addDislike(postId: string, dislike: Dislike) {
        throw new Error("Method not implemented.");
    }
    removeLike(likeId: string) {
        throw new Error("Method not implemented.");
    }
    removeDislike(dislikeId: string) {
        throw new Error("Method not implemented.");
    }
    
   
}